# [START app]
import logging
import os

from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from schema import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@app.route('/api/hello')
def show_hello():
    return 'Poupon? :)'

# "RESTful" JSON API
@app.route('/api/echo/<string:what>')
def show_echo(what):
    return jsonify({'text': what})

@app.route('/api/artists/top')
def show_artists():
    matches = db.session.query(Artist).order_by(Artist.popularity).limit(5).all()
    return jsonify(matches)

@app.route('/api/cities')
def show_cities():
    return 'dsfsdfThis is where we display cities!!!'

@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500
# [END app]
