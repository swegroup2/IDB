from schema import *
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import json
from datetime import datetime

# Create engine
engine = create_engine('postgresql+psycopg2://postgres:downing@localhost:5432/', echo=True)
Base.metadata.create_all(engine)

# Create a Session
Session = sessionmaker(bind=engine)
s = Session()

# Load artists from json
with open('data/artists.json', 'r') as f:
    artist_data = json.load(f)
with open('data/albums.json', 'r') as f:
    album_data = json.load(f)
with open('data/news.json', 'r') as f:
    news_data = json.load(f)
with open('data/cities.json', 'r') as f:
    cities_data = json.load(f)

artists = {row.name:row.Artist for row in s.query(Artist.name, Artist)}
albums = {row.name:row.Album for row in s.query(Album.name, Album)}
genres = {row.name:row.Genre for row in s.query(Genre.name, Genre)}
news = {row.title:row.Article for row in s.query(Article.title, Article)}

# Create all the new genres
for artist in artist_data:
    for g in artist['genres']:
        if g in genres:
            continue
        genres[g] = Genre(name=g)
        s.add(genres[g])

# Create all the new artists
for artist in artist_data:
    if artist['name'] in artists:
        continue
    artists[artist['name']] = Artist(
            artist_picture_link=artist['artist_picture_link'],
            popularity=artist['popularity'],
            name=artist['name'],
            spotify_id=artist['artist_id'])
    artists[artist['name']].genres += [genres[g] for g in artist['genres']]
    s.add(artists[artist['name']])

# Create all the new albums
for album in album_data:
    if album['name'] in albums:
        continue
    albums[album['name']] = Album(
            name=album['name'],
            spotify_id=album['spotify_id'],
            release_date=album['release_date'],
            album_picture_link=album['pic_URL'],
            artist_id=s.query(Artist.artist_id).filter_by(name=album['artist_name']).first())
    s.add(albums[album['name']])

s.commit()

# Create all the new tracks
for album in album_data:
    curr_album_id = albums[album['name']].album_id
    track_names = set()
    for i in range(0, len(album['tracks'])):
        if album['tracks'][i] in track_names:
            continue
        s.add(Track(
            name=album['tracks'][i],
            track_number=album['track_num'][i],
            spotify_id=album['track_spotify_links'][i],
            album_id=curr_album_id))
        track_names.add((album['tracks'][i]);

# Create all the new articles
for article in news_data:
    title = article['title']
    if title in news:
        continue
    news[title] = Article(
            title=title,
            media_link=article['media_link'],
            date=datetime.fromtimestamp(int(float(article['unix_timestamp']))).strftime('%Y-%m-%d'),
            upvotes=article['upvotes'])
    news[title].artists += [artists[name] for name in artists if name in title]
    news[title].albums += [albums[name] for name in albums if name in title]

'''
# Create all the new cities
for city in cities_data:
    cities[city['name']] = City(
            name=city['name'],
            population=city['population'],
            city_picture_link=city['pic_url'],
            state=city['state'])
    cities[city['name']].artists += [artists[name] for name in city['artists']]
'''

# Commit session
s.commit()
