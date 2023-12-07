import yfinance as yf
from datetime import datetime, timedelta


stocks = ['CBA.AX', 'WBC.AX', 'COL.AX', 'WOW.AX', 'ORG.AX', 
          'BHP.AX', 'CSL.AX', 'ANZ.AX', 'NAB.AX', 'FMG.AX']

def summary():
    for stock in stocks:
        # Define the start and end dates for fetching data
        end_date = datetime.now()
        start_date = end_date - timedelta(days=7)  # Fetch data for the last week (7 days)

        # Create a Ticker object using yfinance
        ticker = yf.Ticker(stock)

        # Get historical data for the specified period (weekly)
        historical_data = ticker.history(start=start_date, end=end_date, interval='1wk')
        # Extract the last closing price
        last_close_price = historical_data['Close'].iloc[-1] 
        second_last_close_price = historical_data['Close'].iloc[-2]

        price_change = last_close_price - second_last_close_price

        percentage_change = (last_close_price - second_last_close_price) / second_last_close_price

        print(f"{stock}: Last Price: {round(last_close_price, 2)}, Change: {round(price_change, 2)}, % Change: {round(percentage_change*100, 2)}%")


summary()