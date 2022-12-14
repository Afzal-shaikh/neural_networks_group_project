import os
import numpy as np
import tensorflow as tf

from joblib import load

from keras.wrappers.scikit_learn import KerasRegressor
from keras.models import Sequential

from sklearn.pipeline import Pipeline 



def get_tensorflow_model() -> Sequential:
  tf_model_path = os.path.join('training_neural_network', 'tensorflow_model')
  loaded_model = tf.keras.models.load_model(tf_model_path)
  return loaded_model


def get_sklearn_preprocessing_pipeline() -> Pipeline:
  sklearn_pipeline_path = os.path.join('training_neural_network', 'preprocessing_pipeline.joblib')
  pipline = load(sklearn_pipeline_path)
  return pipline

def get_full_pipeline() -> Pipeline:
  preprocessing_pipeline = get_sklearn_preprocessing_pipeline()

  tf_model = get_tensorflow_model()
  tf_model = KerasRegressor(tf_model)

  full_pipeline = Pipeline([
    ('preprocess', preprocessing_pipeline),
    ('clf', tf_model)
  ])

  return full_pipeline


full_pipeline = get_full_pipeline()


def predict(first_term_gpa, second_term_gpa, first_language, funding_numeric, school_numeric,
            fasttrack_numeric, coop_numeric, residency_numeric, gender_numeric, previous_education,
            age_group, high_school_average, math_score, english_grade):
  inp = np.array([
    first_term_gpa, second_term_gpa, first_language, funding_numeric, school_numeric,
    fasttrack_numeric, coop_numeric, residency_numeric, gender_numeric, previous_education,
    age_group, high_school_average, math_score, english_grade
  ])
  inp = inp.reshape((1, 14))
  return full_pipeline.predict(inp)
