import yfinance as yf
import numpy as np 
import datetime
import pandas as pd

# Helpful Scalars
A = None
B = None
C = None
DELTA = None

# Helper Functions START
def minimumVariancePortfolio(SIGMA_INVERSE, I):
    expected_return = B / A
    stdev = 1 / A
    weights = np.matmul(SIGMA_INVERSE, I) / A
    return {"mean": expected_return, "stdev": stdev, "weights": weights}

# Helper Functions END

# Functions
def Init(Tickers):
    today = datetime.date.today()
    five_years_ago = today - datetime.timedelta(days=365 * 5)
    df = yf.download(Tickers, start=five_years_ago, end=today)

    # log returns of ADJ Close of all tickers
    df = np.log(1 + df['Adj Close'].pct_change())

    # Vector of Expected Returns
    Z = []
    for column in df.columns:
        Z.append(df[column].mean() * 252)
    
    print("Printing the vector of expected annual returns...")
    print(Z)

    # Annualized variance-covariance matrix
    SIGMA = df.cov() * 52
    print("Printing the annual variance-covariance matrix")
    print(SIGMA)

    # Initialising Helpful Scalars A,B,C and DELTA
    SIGMA_INVERSE = np.linalg.inv(SIGMA.values)
    I = [1] * len(Tickers)

    print("printing sigma inverse")
    print(SIGMA_INVERSE)

    global A
    A = np.matmul(np.matmul(np.transpose(I), SIGMA_INVERSE), I)
    print("printing the scalar A")
    print(A)

    global B
    B = np.matmul(np.matmul(np.transpose(I), SIGMA_INVERSE), Z)
    print("printing the scalar B")
    print(B)

    global C
    C = np.matmul(np.matmul(np.transpose(Z), SIGMA_INVERSE), Z)
    print("printing the scalar C")
    print(C)

    global DELTA
    DELTA = A*C - B*B
    print("printing the scalar DELTA")
    print(DELTA)

    # Get expected return, standard deviation and weights of the minimum variance portfolio
    minVarPort = minimumVariancePortfolio(SIGMA_INVERSE, I)
    print("Printing minimum variance portfolio information")
    print(minVarPort)