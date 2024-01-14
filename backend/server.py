from flask import Flask
from json import dumps
from helpers import *
from portfolio import Init, minVarWeights


app = Flask(__name__)

# API Routes Below:
@app.route("/summary/<stock>", methods=["GET"])
def summary_stocks(stock):
    return dumps(summary(stock))

@app.route("/news/all", methods=["GET"])
def all_news():
    return dumps(all_financial_news())

@app.route("/isValid/<stock>", methods=["GET"])
def is_stock_valid(stock):
    return dumps(is_valid_stock(stock))

@app.route("/data/<stock>", methods=["GET"])
def getStockDate(stock):
    return dumps(get_stock_data(stock))

@app.route("/name/<stock>", methods=["GET"])
def getStockName(stock):
    return dumps(get_stock_name(stock))

@app.route("/about/<stock>", methods=["GET"])
def getStockAbout(stock):
    return dumps(get_stock_about(stock))

@app.route("/predict/<stock>", methods=["GET"])
def getStockPredictions(stock):
    return dumps(predict_stock(stock))

# End of API Routes

if __name__ == "__main__":
    app.run(debug=True)