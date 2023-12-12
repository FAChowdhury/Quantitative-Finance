import yfinance as yf
import requests
from datetime import datetime, timedelta
from news_store import news_store

MARKETAUX_API = 'YzgQZXmpnqwyzMotQZdmtA83hg3TW34kqzOnzeT5'

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
	Given a stock symbol, it returns all the stock prices
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
