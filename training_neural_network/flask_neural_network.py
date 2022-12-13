import pandas as pd
import sys
from flask import Flask, request, jsonify
import traceback
import tensorflow as tf
from flask_cors import CORS


# Your API definition
app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=['GET','POST']) #use decorator pattern for the route
def predict():
    if loaded_model:
        try:
            json_ = request.json
            print('JSON: \n', json_)
            query = pd.DataFrame(json_, columns=model_columns)
            prediction = list(loaded_model.predict(query))
            print('prediction=', prediction)
            res = jsonify({"prediction": str(prediction)})
            res.headers.add('Access-Control-Allow-Origin', '*')
            return res
        except:
            return jsonify({'trace': traceback.format_exc()})
    else:
        return ('No model available.')



if __name__ == '__main__':
    try:
        port = int(sys.argv[1]) # This is for a command-line input
    except:
        port = 12345 # If you don't provide any port the port will be set to 12345
        
    # load  model:
    loaded_model = tf.keras.models.load_model('tensorflow_model')
    print(f'Model {loaded_model} loaded')
        
    model_columns =["First Term Gpa", "Second Term Gpa", "First Language", "Funding numeric", "School numeric", "FastTrack numeric",
                    "Coop numeric","Residency numeric","Gender numeric","Previous Education",
                     "Age Group","High School Average Mark","Math Score","English Grade"]

    app.run(port=port, debug=True)