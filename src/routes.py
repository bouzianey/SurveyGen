from flask import Flask, jsonify, render_template, redirect, url_for
from flask_cors import CORS
from flask import request
import json


app = Flask(__name__)
app.debug = True
CORS(app)
app.config['SECRET_KEY'] = 'something'


@app.route('/api_post/<survey>', methods=['POST', 'GET'])
def api_post(survey):
    if request.method == 'POST':
        survey_dict = json.loads(survey)
    return {survey_dict}

