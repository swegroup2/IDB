# [START app]
import logging
import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from database.schema import *
from database.util import *
from sqlalchemy_searchable import search
import json

app = Flask(__name__, static_url_path='', static_folder='poupon-web/build')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)  # Enable cross-origin resource sharing

db = SQLAlchemy(app)

def build_pages(query,page_number,model):
    if model == 'artists':
        page_obj = query.paginate(page_number,12,False) #if true this returns 404, WYWD?
        ser_items = sql_serialize(Artist,*page_obj.items) #can really change the unpacking,packing tbh
    elif model == 'albums':
        page_obj = query.paginate(page_number,12,False)
        ser_items = sql_serialize(Album,*page_obj.items)
    elif model == 'news':
        page_obj = query.paginate(page_number,12,False)
        ser_items = sql_serialize(Article,*page_obj.items)

    page_dict = {"total_pages":page_obj.pages,"current_page":page_number,"items":ser_items}
    return jsonify(page_dict)


def build_query_dict(user_queries=None, wanted_keys=None):
    if user_queries is None or wanted_keys is None:  # fix this - WILLIAM
        return None
    ret_dict = dict((k, user_queries[k]) for k in wanted_keys if k in user_queries)

    if "order" not in ret_dict and "sort" in ret_dict: #default case, order is desc
        ret_dict["order"] = "desc"

    return ret_dict


def build_query(query, query_dict, model):
    matches = query
    if not bool(query_dict) or ('page' in query_dict and len(query_dict)==1): #if empty;default
        if model == 'artists':
            return matches.order_by(Artist.popularity.desc())
        elif model == 'albums':
            return matches.order_by(Album.popularity.desc()) #add default for news?

    for key in query_dict:
        if key == 'city':
            matches = city_filter(matches, query_dict[key], model)
        elif key == 'genre':
            matches = genre_filter(matches, query_dict[key], model)
        # elif key == 'region':
        #     matches = region_filter(matches,query_dict[key],model)
        elif key == 'relyear':
            matches = relyear_filter(matches,query_dict[key],model)
        elif key == 'media':
            matches = media_filter(matches,query_dict[key],model)
        elif key == 'state':
            matches = state_filter(matches, query_dict[key], model)
        elif key == 'poprange':
            matches = poprange_filter(matches,query_dict[key],model)
        elif key == 'sort':
            matches = det_sort(matches,query_dict[key],query_dict["order"],model)
        # elif key == 'population':
        #     matches = population_sort(matches,query_dict[key],model)
        # elif key == 'reldate':
        #     matches = reldate_sort(matches,query_dict[key],model)
        # elif key == 'popularity':
        #     matches = pop_sort(matches, query_dict[key], model)
        # elif key == 'alpha':
        #     matches = alpha_sort(matches,query_dict[key],model)
        # elif key == 'upvotes':
        #     matches = upvote_sort(matches,query_dict[key],model)
        else: #order parameter should pass here
            pass
    return matches


def poprange_filter(query, val, model):  # TO FIX lol... rip
    if val == '1':  # 0-50000
        return query.filter(City.population.between(0, 500000))
    elif val == '2':  # 50000-100000
        return query.filter(City.population.between(500000, 1000000))
    else:
        return query.filter(City.population > 1000000)


def state_filter(query, val, model):
    return query.filter(City.state == val)


def media_filter(query, val, model):  # (youtube, itunes, soundcloud, reddit) -> buttons from the Front End side imo
    return query.filter(Article.media_link.contains(val))


def relyear_filter(query, val, model):
    if model == "albums":
        return query.filter(extract('year', Album.release_date) == val)
    else:
        return query


def city_filter(query, val, model):  # check type?
    if model == "artists":
        return query.join(cities_artists).join(City).filter(City.name == val)
    else:
        return query


def genre_filter(query, val, model):
    if model == "artists":
        return query.join(genres_artists).join(Genre).filter(Genre.name == val)
    if model == "albums":
        return query.join(Artist).join(genres_artists).join(Genre).filter(Genre.name == val)
    else:
        return query


# def region_filter(query,val,model): #explicit join
#     if model is "artists":
#         return query.join(cities_artists).join(City).join()

def det_sort(query,sort_type,order,model):
    if sort_type == "popularity":
        return pop_sort(query,order,model)
    elif sort_type == "population":
        return population_sort(query,order,model)
    elif sort_type == "upvotes":
        return upvote_sort(query,order,model)
    elif sort_type == "reldate":
        return reldate_sort(query,order,model)
    elif sort_type == "alpha":
        return alpha_sort(query,order,model)
    else:
        return query

def population_sort(query,val,model):
    if val == "desc":
        return query.order_by(City.population.desc())
    else:
        return query.order_by(City.population.asc())


def upvote_sort(query, val, model):
    if model == "news":
        if val == "desc":
            return query.order_by(Article.upvotes.desc())
        else:
            return query.order_by(Article.upvotes.asc())


def reldate_sort(query, val, model):
    if model == "albums":
        if val == "desc":
            return query.order_by(Album.release_date.desc())
        else:
            return query.order_by(Album.release_date.asc())
    if model == "news":
        if val == "desc":
            return query.order_by(Article.date.desc())
        else:
            return query.order_by(Article.date.asc())


def pop_sort(query, val, model): # popularity
    if model == "artists":
        if val == "desc":
            return query.order_by(Artist.popularity.desc())
        else:  # should i change this to elif val is "asc"?
            return query.order_by(Artist.popularity.asc())
    elif model == "albums":
        if val == "desc":
            return query.order_by(Album.popularity.desc())
        else:  # should i change this to elif val is "asc"?
            return query.order_by(Album.popularity.asc())


def alpha_sort(query, val, model):
    if model == "artists":
        if val == "desc":
            return query.order_by(Artist.name.desc())
        else:
            return query.order_by(Artist.name.asc())
    elif model == "albums":
        if val == "desc":
            return query.order_by(Album.name.desc())
        else:
            return query.order_by(Album.name.asc())
    elif model == "cities":
        if val == "desc":
            return query.order_by(City.name.desc())
        else:
            return query.order_by(City.name.asc())


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


# Artist endpoints
@app.route('/api/artists/<int:art_id>')
def get_artists_by_id(art_id):
    artist_match = db.session.query(Artist).get(art_id)
    if artist_match is None:
        return not_found()

    album_match = db.session.query(Artist).filter(Artist.artist_id == art_id).join(Album).with_entities(Album).all()
    city_match = db.session.query(Artist).filter(Artist.artist_id == art_id).join(cities_artists).join(
        City).with_entities(City).all()
    news_match = db.session.query(Artist).filter(Artist.artist_id == art_id).join(articles_artists).join(
        Article).with_entities(Article).order_by(Article.date.desc()).all()

    json_artist = sql_single_serialize(Artist, artist_match)
    json_album = sql_serialize(Album, *album_match)
    json_city = sql_serialize(City, *city_match)
    json_news = sql_serialize(Article, *news_match)

    # test = ['name','city_id']
    # json_city = related_col_serialize(test,*city_match)

    final_obj = {"artist": json_artist, "albums": json_album, "cities": json_city, "news": json_news}

    return jsonify(final_obj)


@app.route('/api/artists/top/<int:limit>')
@app.route('/api/artists/top')
def get_artists_top(limit=10):  # OK
    num = max(1, limit)
    matches = db.session.query(Artist).order_by(Artist.popularity.desc()).limit(num).all()
    return sql_json(Artist, *matches)


@app.route('/api/artists/')
@app.route('/api/artists')
def get_all_artists(): #OK order_by(Artist.popularity.desc())
    wanted_keys = ['page','city','genre','region','sort','order'] #valid sort params: popularity,alpha
    query_dict = build_query_dict(request.args.to_dict(),wanted_keys)

    base_query = db.session.query(Artist)#.order_by(Artist.popularity.desc()).all()#.with_entities(Artist.name,Artist.artist_id)
    matches = build_query(base_query,query_dict,'artists')#.all()

    if 'page' in query_dict:
        return build_pages(matches,int(query_dict['page']),'artists')
    else:
        matches = matches.all()
        return sql_json(Artist,*matches)


@app.route('/api/artists/search/<term>')
def search_artists(term):
    matches = search(db.session.query(Artist), term, sort=True).all()
    if matches is None:
        return not_found()
    return sql_json(Artist, *matches)


# Album endpoints
@app.route('/api/albums/<int:alb_id>')
def get_album_by_id(alb_id):  # returns full album model (Album, Artists, News related to album)
    album_match = db.session.query(Album).get(alb_id)
    if album_match is None:
        return not_found()

    artist_match = db.session.query(Album).filter(Album.album_id == alb_id).join(Artist).with_entities(Artist).first()
    news_match = db.session.query(Album).filter(Album.album_id == alb_id).join(articles_albums).join(
        Article).with_entities(Article).order_by(Article.date.desc())

    json_album = sql_single_serialize(Album, album_match)
    json_artist = sql_single_serialize(Artist, artist_match)
    json_news = sql_serialize(Article, *news_match)
    final_obj = {"album": json_album, "artist": json_artist, "news": json_news}
    return jsonify(final_obj)


@app.route('/api/albums/')
@app.route('/api/albums')
def get_all_albums(): #TESTED
    wanted_keys = ['page','genre','relyear','sort','order']
    query_dict = build_query_dict(request.args.to_dict(),wanted_keys)#valid sort params: reldate,alpha,popularity

    base_query = db.session.query(Album)
    matches = build_query(base_query,query_dict,'albums')#.all()

    if 'page' in query_dict:
        return build_pages(matches,int(query_dict['page']),'albums')
    else:
        matches = matches.all()
        return sql_json(Album,*matches)


@app.route('/api/albums/artists/<int:artist_id>')
def get_all_albums_by_artist(artist_id):  # DEPRECATE
    matches = db.session.query(Album).filter_by(artist_id=artist_id).all()
    return sql_json(Album, *matches)


@app.route('/api/albums/search/<term>')
def search_albums(term):
    matches = search(db.session.query(Album), term, sort=True).all()
    if matches is None:
        return not_found()
    return sql_json(Album, *matches)


# News endpoints
@app.route('/api/news/<int:news_id>')
def get_articles_by_id(news_id):  # FULL NEWS ID NEEDED??? << NOTE TO WILL: WTF IS THIS FOR
    news_match = db.session.query(Article).get(news_id)
    if news_match is None:
        return not_found()

    artist_match = db.session.query(Article).filter(Article.article_id == news_id). \
        join(articles_artists).join(Artist).with_entities(Artist).all()
    album_match = db.session.query(Article).filter(Article.article_id == news_id). \
        join(articles_albums).join(Album).with_entities(Album).all()

    json_news = sql_single_serialize(Article, news_match)
    json_artist = sql_serialize(Artist, *artist_match)
    json_album = sql_serialize(Album, *album_match)
    final_obj = {"news": json_news, "artists": json_artist, "albums": json_album}
    return jsonify(final_obj)


@app.route('/api/news/date/<int:iso_date>')
def get_articles_by_date(iso_date):  # OK -> to decide to deprecate tbh
    conv_date = datetime.strptime(iso_date, "%Y-%m-%d").date()
    matches = db.session.query(Article).filter_by(date=conv_date).all()
    return sql_json(Article, *matches)


@app.route('/api/news/')
@app.route('/api/news')
def get_all_articles():  # OK
    wanted_keys = ['page','media','sort','order'] #valid sort params: upvotes,reldate
    query_dict = build_query_dict(request.args.to_dict(),wanted_keys)

    base_query = db.session.query(Article)
    matches = build_query(base_query,query_dict,'news')#.all()

    if 'page' in query_dict:
        return build_pages(matches,int(query_dict['page']),'news')
    else:
        matches = matches.all()
        return sql_json(Article,*matches)


@app.route('/api/news/search/<term>')
def search_articles(term):
    matches = search(db.session.query(Article), term, sort=True).all()
    if matches is None:
        return not_found()
    return sql_json(Article, *matches)


# Cities endpoints
@app.route('/api/cities/<int:c_id>')
def get_city_by_id(c_id):  # FULL CITY MODEL (City,Artist,Album)
    city_match = db.session.query(City).get(c_id)
    if city_match is None:
        return not_found()

    artist_match = db.session.query(City).filter(City.city_id == c_id).join(cities_artists).join(Artist).with_entities(
        Artist).all()
    news_match = db.session.query(City).filter(City.city_id == c_id).join(cities_artists).join(Artist).join(
        articles_artists).with_entities(Article).order_by(Article.date.desc()).all()

    json_city = sql_single_serialize(City, city_match)
    json_artist = sql_serialize(Artist, *artist_match)
    json_news = sql_serialize(Article, *news_match)
    final_obj = {"city": json_city, "artists": json_artist, "news": json_news}
    return jsonify(final_obj)


@app.route('/api/cities/')
@app.route('/api/cities')
def get_all_cities():  # OK
    wanted_keys = ['page','state','region','poprange', 'sort','order'] #valid sort params: alpha, population
    query_dict = build_query_dict(request.args.to_dict(),wanted_keys)

    base_query = db.session.query(City)
    matches = build_query(base_query, query_dict, 'cities').all()
    return sql_json(City, *matches)


@app.route('/api/cities/search/<term>')
def search_cities(term):
    matches = search(db.session.query(City), term, sort=True).all()
    if matches is None:
        return not_found()
    return sql_json(City, *matches)


# Error handler
@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500

# [END app]
