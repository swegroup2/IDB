from database.schema import *
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import json
from datetime import datetime

class DataInserter:
    def __init__(self, s):
        self.s = s
        self.artists = {row.name:row.Artist for row in self.s.query(Artist.name, Artist)}
        self.albums = {row.name:row.Album for row in self.s.query(Album.name, Album)}
        self.genres = {row.name:row.Genre for row in self.s.query(Genre.name, Genre)}
        self.news = {row.title:row.Article for row in self.s.query(Article.title, Article)}
        self.cities = {row.name:row.City for row in self.s.query(City.name, City)}

    # Add new artists and genres to the database
    def update_artists(self, artist_data):
        # Update genres
        for art in artist_data:
            for g in art['genres']:
                if g in self.genres:
                    continue
                self.genres[g] = self.add_genre(g)
        # Update artists
        self.artists.update({art['name']:self.add_artist(art) for art in artist_data if art['name'] not in self.artists})
        self.s.commit()

    # Add new albums o the database
    def update_albums(self, album_data):
        # Update albums
        new_albums = []
        for alb in album_data:
            if alb['name'] in self.albums:
                continue
            self.albums[alb['name']] = self.add_album(alb, new_albums)
        self.s.commit()
        # Update tracks
        [self.add_tracks(alb) for alb in new_albums]
        self.s.commit()

    # Add new articles to the database
    def update_news(self, news_data):
        for article in news_data:
            if article['title'] in self.news:
                continue
            self.news[article['title']] = self.add_article(article)
        self.s.commit()

    # Add new cities to the database
    def update_cities(self, cities_data):
        self.cities.update({city['name']:self.add_city(city) for city in cities_data if city['name'] not in cities})
        self.s.commit()

    # Add a genre to the database
    def add_genre(self, g):
        new_genre = Genre(name=g)
        self.s.add(new_genre)
        return new_genre

    # Add an artist to the database
    def add_artist(self, art):
        new_artist = Artist(
                artist_picture_link=art['artist_picture_link'],
                popularity=art['popularity'],
                name=art['name'],
                spotify_id=art['artist_id'])
        new_artist.genres += [self.genres[g] for g in art['genres']]
        self.s.add(new_artist)
        return new_artist

    # Add an album to the database
    def add_album(self, alb, new_albums):
        new_album = Album(
                name=alb['name'],
                spotify_id=alb['spotify_id'],
                release_date=alb['release_date'],
                album_picture_link=alb['pic_URL'],
                artist_id=self.artists[alb['artist_name']].artist_id)
        new_albums.append(new_album)
        self.s.add(new_album)
        return new_album

    # Add the tracks for an album to the database
    def add_tracks(self, alb):
        alb_id = self.albums[alb['name']].album_id
        tracks = [list(a) for a in zip(alb['tracks'], alb['track_num'], alb['track_spotify_links'])]
        track_names = set()
        for i in range(0, len(tracks)):
            if tracks[i][0] in track_names:
                continue
            self.s.add(Track(
                name=tracks[i][0],
                track_number=tracks[i][1],
                spotify_id=tracks[i][2],
                album_id=alb_id))
            track_names.add(tracks[i][0]);

    # Add a news article to the database
    def add_article(self, article):
        title = article['title']
        new_article = Article(
            title=title,
            media_link=article['media_link'],
            date=datetime.fromtimestamp(int(float(article['unix_timestamp']))).strftime('%Y-%m-%d'),
            upvotes=article['upvotes'],
            thumbnail=article['thumbnail'])
        new_article.artists += [self.artists[name] for name in self.artists if name in title]
        new_article.albums += [self.albums[name] for name in self.albums if name in title]
        self.s.add(new_article)

    # Add a city to the database
    def add_city(self, city):
        new_city = City(
            name=city['name'],
            population=city['population'],
            city_picture_link=city['pic_url'],
            state=city['state'])
        new_city.artists += [self.artists[name] for name in city['artists']]
        self.s.add(new_city)
        return new_city

if __name__ == '__main__':
    # Create engine/session
    engine = create_engine('postgresql+psycopg2://postgres:downing@localhost:5432/', echo=True)
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    s = Session()

    # Class to insert data
    di = DataInserter(s)

    # Load and update artists
    with open('data/artists.json', 'r') as f:
        artist_data = json.load(f)
    di.update_artists(artist_data)

    # Load and update albums
    with open('data/albums.json', 'r') as f:
        album_data = json.load(f)
    di.update_albums(album_data)

    # Load and update news
    with open('data/news.json', 'r') as f:
        news_data = json.load(f)
    di.update_news(news_data)

    # Load and update cities
    with open('data/cities.json', 'r') as f:
        cities_data = json.load(f)
    di.update_cities(cities_data)
