# [START app]
import logging
import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from database.schema import *
from database.util import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@app.route('/api/hello')
def show_hello():
    return jsonify({'hello': 'world'})

# "RESTful" JSON API
@app.route('/api/echo/<string:what>')
def show_echo(what):
    return jsonify({'text': what})

@app.route('/api/artists')
def get_all_artists():
	matches = db.session.query(Artist).all()
	return sql_json(Artist, *matches)

@app.route('/api/artists/<int:a_id>')
def get_specific_artist(a_id=1):
	artist_id = a_id
	matches = db.session.query(Artist).filter_by(artist_id=artist_id).first()
	return sql_json(Artist, *matches)

@app.route('/api/albums')
def get_all_albums():
	matches = db.session.query(Album).all()
	return sql_json(Album, *matches)

@app.route('/api/albums/<int:id>')
def get_specific_album(a_id=1):
	matches = db.session.query(Album).get(a_id)
	return sql_json(Album, *matches)
	



@app.route('/api/artists/top/<int:num>')
@app.route('/api/artists/top')
def show_artists_top(num=5):
    num = max(1, min(10, num))
    matches = db.session.query(Artist).order_by(Artist.popularity.desc()).limit(num).all()
    return sql_json(Artist, *matches)

@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500
# [END app]
