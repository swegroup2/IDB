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

# Artist endpoints
@app.route('/api/artists/<int:art_id>')
def get_artist_by_id(art_id):
    matches = db.session.query(Artist).get(art_id).first()
    return sql_json(Artist, *matches)

@app.route('/api/artists/top/<int:num>')
@app.route('/api/artists/top')
def get_artists_top(num=10):
    num = max(1, min(10, num))
    matches = db.session.query(Artist).order_by(Artist.popularity.desc()).limit(num).all()
    return sql_json(Artist, *matches)

@app.route('/api/artists')
def get_all_artists():
    matches = db.session.query(Artist).all()
    return sql_json(Artist, *matches)

# Album endpoints
@app.route('/api/albums/<int:alb_id>')
def get_album_by_id(alb_id):
    matches = db.session.query(Album).get(alb_id).first()
    return sql_json(Album, *matches)

@app.route('/api/albums')
def get_all_albums():
    matches = db.session.query(Album).all()
    return sql_json(Album, *matches)

# News endpoints
@app.route('/api/news')
def get_articles():
	matches = db.session.query(Article).order_by(Article.date.desc()).all()
	return sql_json(Article, *matches)

@app.route('/api/news/<int:iso_date>')
def get_articles_by_date(iso_date):
    conv_date = datetime.strptime(iso_date, "%Y-%m-%d").date()
    matches = db.session.query(Article).filter_by(date=conv_date).all()
    return sql_json(Article, *matches)

# Cities endpoints
@app.route('/api/cities/<int:c_id>')
def get_city_by_id(c_id):
	matches = db.session.query(City).get(c_id).first()
	return sql_json(City, *matches)

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
