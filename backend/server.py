from flask import Flask
from json import dumps
from helpers import summary

app = Flask(__name__)

# API Routes Below:
@app.route("/summary/<stock>", methods=["GET"])
def summary_stocks(stock):
    return dumps(summary(stock))

# End of API Routes

if __name__ == "__main__":
    app.run(debug=True)