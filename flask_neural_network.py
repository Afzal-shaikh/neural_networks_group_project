import sys
import numpy as np
import traceback

from classifier import predict

from flask import Flask, request, jsonify
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=['GET','POST']) #use decorator pattern for the route
def home():
  try:
    payload = request.json[0]
    payload = [int(v) for k, v in payload.items()]

    result = predict(*payload)[0].tolist()

    res = jsonify({"prediction": result})
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res
  except:
   return jsonify({'trace': traceback.format_exc()}) 



if __name__ == '__main__':
    try:
        port = int(sys.argv[1]) # This is for a command-line input
    except:
        port = 12345 # If you don't provide any port the port will be set to 12345

    app.run(port=port, debug=True)