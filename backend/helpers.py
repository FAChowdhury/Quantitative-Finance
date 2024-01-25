import yfinance as yf
import requests
import wikipedia
from datetime import datetime, timedelta
from pandas.tseries.offsets import BDay
from news_store import news_store
from statsmodels.tsa.stattools import adfuller
from statsmodels.tsa.arima.model import ARIMA
from pmdarima import auto_arima
from sklearn.metrics import mean_squared_error
from math import sqrt
import pandas as pd
import warnings

MARKETAUX_API = 'YzgQZXmpnqwyzMotQZdmtA83hg3TW34kqzOnzeT5'

'''
Helpers
'''

'''
Perform ADF Test on timeseries data to determine if they are stationary
Returns a boolean to indicate if the time series data is stationary
'''
def is_stationary(timeseries):
	res = adfuller(timeseries)
	# return False if res[1] > 0.05 else True
	return [False if res[1] > 0.05 else True, res[0], res[1]]

'''
END Helpers
'''

'''
Returns the daily summary of a stock. This includes: stock symbol,  last closing price,
and last percentage change.
'''
def summary(stock: str):
	try:
		# Define the start and end dates for fetching data
		end_date = datetime.now()
		start_date = end_date - timedelta(days=7)  # Make sure data for today and yesterday are definitely fetched

		# Create a Ticker object using yfinance
		ticker = yf.Ticker(stock)

		# Get historical data for the specified period (daily)
		historical_data = ticker.history(start=start_date, end=end_date, interval='1d')
		# Extract the last closing price
		last_close_price = historical_data['Close'].iloc[-1] 
		second_last_close_price = historical_data['Close'].iloc[-2]

		price_change = last_close_price - second_last_close_price

		percentage_change = (last_close_price - second_last_close_price) / second_last_close_price

		return {'Stock': stock, 'Last_Price': round(last_close_price, 2), 'Change': round(price_change, 2), 'Percentage_Change': round(percentage_change*100, 2)}
	except Exception as e:
		raise e("Stock symbol does not exist!")  
	
''' 
Returns daily financial news from a pool of all news

If the news_store['news'] is empty or its been at least 24 hours since yesterday 4pm:
		APICALL is made and news_store is set
Else:
		Obtain information from news_store

'''
def all_financial_news():
	store = news_store.get()
	news = store['news']

	now = datetime.now()
	yesterday = now - timedelta(days=1)
	yesterday_4pm = datetime(yesterday.year, yesterday.month, yesterday.day, 16, 0, 0)
	time_difference = now - yesterday_4pm
	hours_difference = time_difference.total_seconds() / 3600 
	if hours_difference > 24 or len(news) == 0:
		url = f'https://api.marketaux.com/v1/news/all?symbols=TSLA,AMZN,MSFT,GOOG,CBA.AX&filter_entities=true&language=en&api_token={MARKETAUX_API}'
		response = requests.get(url)

		if response.status_code == 200:
			data = response.json()  # Assuming the response is in JSON format

			# wipe news_store
			news.clear()
			# put data into news_store
			news.append(data)
			# set news_store
			news_store.set(store)

			return data
		else:
			raise Exception('Failed to financial news data')
	else:
		# fetch the data from news_store
		store = news_store.get()
		return store['news'][0]

'''
	Given a string, it returns a boolean indicating if the stock exists or not.
'''
def is_valid_stock(symbol: str):
	try:
		stock = yf.Ticker(symbol)
		info = stock.info
		if info['symbol'].upper() == symbol.upper():
			return True
	except Exception as e:
		pass
	return False

'''
	Given a stock symbol, it returns all the stock close prices for the past 5 years
'''
def get_stock_data(symbol: str):
	try:
		dataList = []
		stock = yf.Ticker(symbol)
		historical_data = stock.history(period="5y")['Close']
		for date, price in historical_data.iteritems():
			dataList.append({'symbol': symbol, 'date': date.strftime('%d-%m-%Y'), 'price': round(price, 2)})
		
		return dataList
	except Exception as e:
		raise e("Stock symbol does not exist!")
	
def get_stock_name(symbol: str):
    stock = yf.Ticker(symbol)
    if stock.info.get('longName'):
        return stock.info['longName']
    else:
        raise Exception("Full name not found for this symbol.")

def get_stock_about(symbol: str):
	try:
		name = get_stock_name(symbol)
		return wikipedia.summary(name)
	except:
		raise Exception(f"Could not retrieve data for {symbol}")


'''
Return {Predictions: [], Dates: [], p-value: float, RMSE: float,order: (p,d,q), differenced: boolean, stationary: boolean}
'''
def predict_stock(symbol: str):
	stock = yf.Ticker(symbol)
	historical_data = stock.history(period="5y")
	data = historical_data['Close']
	stationary = is_stationary(data)
	# print(historical_data)
	if not stationary[0]:
		# make the time series data stationary using differencing
		historical_data['Close_diff'] = historical_data['Close'] - historical_data['Close'].shift(1)
		historical_data = historical_data.dropna()
		# print(historical_data)
		# print(is_stationary(historical_data['Close_diff']))
		data = historical_data['Close_diff']
		stationary = is_stationary(historical_data['Close_diff'])
		
	differenced = False if data.name != 'Close_diff' else True
	# print(data)
	# print(stationary)
	# print(differenced)

	# if differencing was required to make data stationary
	# fitting ARIMA Model
	warnings.filterwarnings("ignore")
	stepwise = auto_arima(data, trace=False, suppress_warnings=True)
	stepwise_fit = stepwise.fit(data)
	# print(stepwise_fit.order) # gives order (p,d,q) of the best model fit
	

	# Split data for training and testing
	train = data.iloc[:-60] # all data except the last two months
	test = data.iloc[-60:] # last two moths data
	
	# Training the model
	model = ARIMA(train, order = stepwise_fit.order)
	model = model.fit()
	# print(model.summary())

	# Test the Model
	start = len(train)
	end = len(train) + len(test) - 1
	pred = model.predict(start = start, end = end, typ='levels')

	# Get today's date
	end_date = datetime.now()

	# Calculate the start date by subtracting 60 business days from the current date
	start_date = end_date - 60 * BDay()

	# Generate the business days date range
	business_days_range = pd.date_range(start=start_date, end=end_date - BDay(), freq=BDay())

	testData = list(test)
	testPrediction = list(pred)
	testDates = list(business_days_range.strftime('%d-%m-%Y'))

	pred.index = data.index[start:end+1]
	rmse = sqrt(mean_squared_error(pred, test))
	# print(rmse)

	# Forecast using the model
	model2 = ARIMA(data, order=stepwise_fit.order)
	model2 = model2.fit()
	today = datetime.today()
	next_business_day = today + pd.offsets.BDay()
	# print(next_business_day)
	end_date = today + pd.DateOffset(weeks=2)
	forecast_dates = pd.date_range(start = next_business_day, end = end_date, freq='B')
	pred = model2.predict(start = len(data), end=len(data) + len(forecast_dates) - 1, typ='levels').rename('Stock Price Forecasts')
	pred.index = forecast_dates

	# Pass the list of date below as the dates of the forcasted stock prices
	dates = list(forecast_dates.strftime('%d-%m-%Y'))

	# Pass the list below as the forcasted stock prices
	if differenced:
		# Future Stock Prediction
		predicted_stock_prices = []
		last_price = historical_data['Close'].iloc[-1]
		for price in pred:
			last_price += price
			predicted_stock_prices.append(last_price)

		# Test Data Stock Prediction
		test_predicted_stock_prices = []
		test_last_price = historical_data['Close'].iloc[-61]
		for price in testPrediction:
			test_last_price += price
			test_predicted_stock_prices.append(test_last_price)

		# Test Data 
		test_data = []
		test_last_price = historical_data['Close'].iloc[-61]
		for price in testData:
			test_last_price += price
			test_data.append(test_last_price)
		return {"Predictions": predicted_stock_prices, "Dates": dates, "p_value": stationary[2], "RMSE": rmse, "order": stepwise_fit.order, "differenced": differenced, "stationarity": stationary[0],
				"TestPredictions": test_predicted_stock_prices, "TestData": test_data, "TestDates": testDates,
		  		}
	else:
		return {"Predictions": list(pred), "Dates": dates, "p_value": stationary[2], "RMSE": rmse, "order": stepwise_fit.order, "differenced": differenced, "stationarity": stationary[0],
		  		"TestPredictions": testPrediction, "TestData": testData, "TestDates": testDates,
				}