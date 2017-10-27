# [START app]
import logging
import os
from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from database.schema import *
from database.util import sql_json, not_found

app = Flask(__name__,static_url_path='',static_folder='poupon-web/build')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app) # Enable cross-origin resource sharing

db = SQLAlchemy(app)

@app.route('/artists/')
@app.route('/artists/<path>')
@app.route('/about')
@app.route('/about/<path>')
@app.route('/albums')
@app.route('/albums/<path>')
@app.route('/news')
@app.route('/news/<path>')
@app.route('/cities')
@app.route('/cities/<path>')
@app.route('/')
def root(path=""):
    return app.send_static_file('index.html')

@app.route('/api/hello')
def show_hello():
    return jsonify({'hello': 'world'})

# "RESTful" JSON API
@app.route('/api/echo/<string:what>')
def show_echo(what):
    return jsonify({'text': what})

# Artist endpoints
@app.route('/api/artists/<int:art_id>')
def get_artist_by_id(art_id):
    match = db.session.query(Artist).get(art_id)
    if match is None:
        return not_found()
    return sql_json(Artist, match)

@app.route('/api/artists/top/<int:limit>')
@app.route('/api/artists/top')
def get_artists_top(limit=10):
    num = max(1, limit)
    matches = db.session.query(Artist).order_by(Artist.popularity.desc()).limit(num).all()
    return sql_json(Artist, *matches)

@app.route('/api/artists')
def get_all_artists():
    matches = db.session.query(Artist).order_by(Artist.popularity.desc()).all()
    return sql_json(Artist, *matches)

# Album endpoints
@app.route('/api/albums/<int:alb_id>')
def get_album_by_id(alb_id):
    match = db.session.query(Album).get(alb_id)
    if match is None:
        return not_found()
    return sql_json(Album, match)

@app.route('/api/albums')
def get_all_albums():
    matches = db.session.query(Album).all()
    return sql_json(Album, *matches)

# News endpoints
@app.route('/api/news/<int:news_id>')
def get_articles_by_id(news_id):
    match = db.session.query(Article).get(news_id)
    if match is None:
        return not_found()
    return sql_json(Article, match)

@app.route('/api/news/date/<int:iso_date>')
def get_articles_by_date(iso_date):
    conv_date = datetime.strptime(iso_date, "%Y-%m-%d").date()
    matches = db.session.query(Article).filter_by(date=conv_date).all()
    return sql_json(Article, matches)

@app.route('/api/news')
def get_all_articles():
    matches = db.session.query(Article).order_by(Article.date.desc()).all()
    return sql_json(Article, *matches)

# Cities endpoints
@app.route('/api/cities/<int:c_id>')
def get_city_by_id(c_id):
    match = db.session.query(City).get(c_id)
    if match is None:
        return not_found()
    return sql_json(City, match)

@app.route('/api/cities')
def get_all_cities():
    matches = db.session.query(City).order_by(City.population.desc()).all()
    return sql_json(City, *matches)

# Error handler
@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500

# [END app]
