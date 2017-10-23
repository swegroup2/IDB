from schema import *
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import json

# Create engine
engine = create_engine('postgresql+psycopg2://postgres:downing@localhost:5432/', echo=True)
Base.metadata.create_all(engine)

# Create a Session
Session = sessionmaker(bind=engine)
s = Session()

# Load artists from json
with open('data/artists.json', 'r') as f:
    artist_data = json.load(f)['artists']
with open('data/albums.json', 'r') as f:
    album_data = json.load(f)['albums']

'''
# Create all the genres
genres = {}
for artist in artist_data:
    for g in artist['genres']:
        if g in genres:
            continue
        genres[g] = Genre(name=g)
        #s.add(genres[g])

# Create all the artists
artists = {}
for artist in artist_data:
    if artist['name'] in artists:
        continue
    artists[artist['name']] = Artist(
            artist_picture_link=artist['artist_picture_link'],
            popularity=artist['popularity'],
            name=artist['name'],
            spotify_id=artist['artist_id'])
    artists[artist['name']].genres += [genres[g] for g in artist['genres']]
    #s.add(artists[artist['name']])
'''

# Create all the albums
albums = {}
for album in album_data:
    if album['name'] in album:
        continue
    albums[album['name']] = Album(
            name=album['name'],
            spotify_id=album['spotify_id'],
            release_date=album['release_date'],
            album_picture_link=album['pic_URL'],
            artist_id=s.query(Artist.artist_id).filter_by(name=album['artist_name']).first())
    s.add(albums[album['name']])

# Commit session
s.commit()
