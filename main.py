# [START app]
import logging
import os
from flask import Flask
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from database.schema import *
from database.util import *
import json

# from sqlalchemy.ext.declarative import DeclarativeMeta

app = Flask(__name__, static_url_path='', static_folder='poupon-web/build')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)  # Enable cross-origin resource sharing

db = SQLAlchemy(app)

# class AlchemyEncoder(json.JSONEncoder):
#     def default(self, o):
#         if isinstance(o, tuple):
#             data = {}
#             for obj in o:
#                 data.update(self.parse_sqlalchemy_object(obj))
#             return data
#         if isinstance(o.__class__, DeclarativeMeta):
#             return self.parse_sqlalchemy_object(o)
#         return json.JSONEncoder.default(self, o)

#     def parse_sqlalchemy_object(self, o):
#         data = {}
#         fields = o.__json__() if hasattr(o, '__json__') else dir(o)
#         for field in [f for f in fields if not f.startswith('_') and f not in ['metadata', 'query', 'query_class']]:
#             value = o.__getattribute__(field)
#             try:
#                 json.dumps(value)
#                 data[field] = value
#             except TypeError:
#                 data[field] = None
#         return data

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

@app.route('/api/model/artists/<int:art_id>')
def get_artist_model(art_id):
    artist_match = db.session.query(Artist).get(art_id)
    if artist_match is None:
        return not_found()

    album_match = db.session.query(Artist).filter(Artist.artist_id==art_id).join(Album).with_entities(Album.name,Album.album_id).all()
    # album_match = db.session.query(Album).\
    #     join(Artist).filter(Artist.artist_id==art_id).options(defer("spotify_id")).all()
    city_match = db.session.query(Artist).filter(Artist.artist_id==art_id).join(cities_artists).join(City).with_entities(City.name,City.city_id).all()
    news_match = db.session.query(Artist).filter(Artist.artist_id==art_id).join(articles_artists).join(Article).with_entities(Article.title,Article.article_id).all()

    #json_artist = json.dumps(artist_match,cls=AlchemyEncoder,indent=4)
    json_artist = sql_single_serialize(Artist,artist_match)
    #return jsonify(album_match)


    final_obj = {"artist":json_artist,"albums":album_match,"cities":city_match,"news":news_match}
    return jsonify(final_obj)


# Artist endpoints
@app.route('/api/artists/<int:art_id>')
def get_artist_by_id(art_id): #returns the full artist model
    artist_match = sql_single_serialize(Artist,db.session.query(Artist).get(art_id))
    if artist_match is None:
        return not_found()
    album_match = sql_serialize(Album,*db.session.query(Artist).filter(Artist.artist_id==art_id).join(Album).with_entities(Album).all())
    city_match = sql_serialize(City,*db.session.query(Artist).filter(Artist.artist_id==art_id).join(cities_artists).join(City).with_entities(City).all())
    news_match = sql_serialize(Article,*db.session.query(Artist).filter(Artist.artist_id==art_id).join(articles_artists).join(Article).with_entities(Article).all())

    final_obj = {"artist":artist_match,"albums":album_match,"cities":city_match,"news":news_match}
    return jsonify(final_obj)



@app.route('/api/artists/top/<int:limit>')
@app.route('/api/artists/top')
def get_artists_top(limit=10): #OK
    num = max(1, limit)
    matches = db.session.query(Artist).order_by(Artist.popularity.desc()).limit(num).all()
    return sql_json(Artist,*matches)


@app.route('/api/artists')
def get_all_artists(): #OK
    matches = db.session.query(Artist).order_by(Artist.popularity.desc()).all()
    return sql_json(Artist,*matches)


# Album endpoints
@app.route('/api/albums/<int:alb_id>')
def get_album_by_id(alb_id): #returns full album model (Album, Artists, News related to album)
    album_match = sql_single_serialize(Album,db.session.query(Album).get(alb_id))
    if album_match is None:
        return not_found()
    #fix .first() into something else?
    artist_match = sql_single_serialize(Artist,db.session.query(Album).filter(Album.album_id==alb_id).join(Artist).with_entities(Artist).first())
    news_match = sql_serialize(Article,*db.session.query(Album).filter(Album.album_id==alb_id).join(articles_albums).join(Article).with_entities(Article))

    final_obj = {"artist":artist_match,"album":album_match,"news":news_match}
    return jsonify(final_obj)


@app.route('/api/albums')
def get_all_albums(): #OK
    matches = db.session.query(Album).order_by(Album.popularity.desc()).all()
    return sql_json(Album,*matches)


@app.route('/api/albums/artists/<int:artist_id>')
def get_all_albums_by_artist(artist_id): #OK
    matches = db.session.query(Album).filter_by(artist_id=artist_id).all()
    return sql_json(Album,*matches)


# News endpoints
@app.route('/api/news/<int:news_id>')
def get_articles_by_id(news_id): #FULL NEWS ID NEEDED???
    match = db.session.query(Article).get(news_id)
    if match is None:
        return not_found()
    return jsonify(sql_single_serialize(Article,match))


@app.route('/api/news/date/<int:iso_date>')
def get_articles_by_date(iso_date): #OK
    conv_date = datetime.strptime(iso_date, "%Y-%m-%d").date()
    matches = db.session.query(Article).filter_by(date=conv_date).all()
    return sql_json(Article,*matches)


# @app.route('/api/cities/artists/<int:city_id>')
# def get_artists_by_city(city_id): #TO DEPRECATE
#     matches = db.session.query(cities_artists).filter_by(city_id=city_id).all()
#     return json.dumps(matches,cls=AlchemyEncoder,indent=4)


# @app.route('/api/news/artists/<int:art_id>')
# def get_artists_by_article(art_id): #TO DEPRECATE
#     matches = db.session.query(articles_artists).filter_by(article_id=art_id).all()

#     return json.dumps(matches,cls=AlchemyEncoder,indent=4)


# @app.route('/api/artists/cities/<int:artist_id>')
# def get_city_by_artist(artist_id): #TO DEPRECATE
#     matches = db.session.query(cities_artists).filter_by(artist_id=artist_id).all()
#     return json.dumps(matches,cls=AlchemyEncoder,indent=4)


@app.route('/api/news')
def get_all_articles(): #OK
    matches = db.session.query(Article).order_by(Article.date.desc()).all()
    return sql_json(Article,*matches)


# Cities endpoints
@app.route('/api/cities/<int:c_id>')
def get_city_by_id(c_id): #FULL CITY MODEL (City,Artist,Album)
    city_match = sql_single_serialize(City,db.session.query(City).get(c_id))
    if city_match is None:
        return not_found()
    artist_match = sql_serialize(Artist,*db.session.query(City).filter(City.city_id==c_id).join(cities_artists).join(Artist).with_entities(Artist).all())
    album_match = sql_serialize(Album,*db.session.query(City).filter(City.city_id==c_id).join(cities_artists).join(Artist).\
        join(Album).with_entities(Album).all())

    final_obj = {"City":city_match,"Artists":artist_match,"Albums":album_match}
    return jsonify(final_obj)


@app.route('/api/cities')
def get_all_cities(): #OK
    matches = db.session.query(City).order_by(City.population.desc()).all()
    return sql_json(City,*matches)


# Error handler
@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500

# [END app]
