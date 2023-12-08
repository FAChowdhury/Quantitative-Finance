from flask import Flask
from json import dumps
from helpers import summary, all_financial_news

app = Flask(__name__)

# API Routes Below:
@app.route("/summary/<stock>", methods=["GET"])
def summary_stocks(stock):
    return dumps(summary(stock))

@app.route("/news/all", methods=["GET"])
def all_news():
    return dumps(all_financial_news())

# End of API Routes

if __name__ == "__main__":
    app.run(debug=True)