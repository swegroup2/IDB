from schema import *
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import json
from datetime import datetime
import spotipy
import spotipy.util as util

class DataInserter:
    def __init__(self, s):
        self.s = s
        self.artists = {row.name: row.Artist for row in self.s.query(Artist.name, Artist)}
        self.albums = {row.name: row.Album for row in self.s.query(Album.name, Album)}
        self.genres = {row.name: row.Genre for row in self.s.query(Genre.name, Genre)}
        self.news = {row.title: row.Article for row in self.s.query(Article.title, Article)}
        self.cities = {row.name: row.City for row in self.s.query(City.name, City)}

    # Add new artists and genres to the database
    def update_artists(self, artist_data): # Update genres
        for art in artist_data:
            for g in art['genres']:
                if g in self.genres:
                    continue
                self.genres[g] = self.add_genre(g)
        # Update artists
        self.artists.update(
            {art['name']: self.add_artist(art) for art in artist_data if art['name'] not in self.artists})
        self.s.commit()

    # Add new albums to the database
    def update_albums(self, album_data):
        # Update albums
        new_albums = []
        for alb in album_data:
            if alb['name'] in self.albums:
                continue
            if alb['artist_name'] not in self.artists:
                continue
            if len(str(alb['release_date'])) < 10:
                continue
            if 'Deluxe' in alb['name']:
                continue
            self.albums[alb['name']] = self.add_album(alb, new_albums)
        self.s.commit()
        # Update tracks
        for alb in new_albums:
            self.add_tracks(alb)
        self.s.commit()

    # Add new articles to the database
    def update_news(self, news_data):
        for article in news_data:
            if article['title'] in self.news:
                continue
            if 'Discussion' in article['title']:
                continue
            self.news[article['title']] = self.add_article(article)
        self.s.commit()

    # Add new cities to the database
    def update_cities(self, cities_data):
        self.cities.update(
            {city['name']: self.add_city(city) for city in cities_data if city['name'] not in self.cities})
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
        new_albums.append(alb)
        self.s.add(new_album)
        return new_album

    # Add the tracks for an album to the database
    def add_tracks(self, alb):
        tracks = [list(a) for a in zip(alb['tracks'], alb['track_num'], alb['track_spotify_links'])]
        track_names = set()
        for i in range(0, len(tracks)):
            if tracks[i][0] in track_names:
                continue
            new_track = Track(
                name=tracks[i][0],
                track_number=tracks[i][1],
                spotify_id=tracks[i][2],
                album_id=self.albums[alb['name']].album_id)
            self.s.add(new_track)
            track_names.add(tracks[i][0])

    # Add a news article to the database
    def add_article(self, article):
        title = article['title']
        new_article = Article(
            title=title,
            media_link=article['media_link'],
            date=datetime.fromtimestamp(int(float(article['unix_timestamp']))).strftime('%Y-%m-%d'),
            upvotes=article['upvotes'],
            thumbnail=article['thumbnail'])
        new_article.artists += [self.artists[name] for name in self.artists if all((len(name) >= 5, name.lower() in title.lower()))]
        new_article.albums += [self.albums[name] for name in self.albums if all((len(name) >= 5, name.lower() in title.lower()))]
        if new_article.thumbnail == '':
            if len(new_article.artists) > 0:
                new_article.thumbnail = new_article.artists[0].artist_picture_link
            elif len(new_article.albums) > 0:
                new_article.thumbnail = new_article.albums[0].album_picture_link
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
        self.s.commit()

    def add_album_popularity(self):
        token = util.prompt_for_user_token(username='sarahgw_',
            scope='user-follow-read',
            client_id='9e5c6ecf7f5a40f0a67f6fad9fa3bf26',
            client_secret='4d765ad11de4455b974d2817be3d98d2',
            redirect_uri='https://example.com/callback/')
        sp = spotipy.Spotify(auth=token)
        for name,album in self.albums.items():
            if album.popularity is None:
                album.popularity = sp.album(album.spotify_id)['popularity']
                print('%s %d' % (name,album.popularity))
        self.s.commit()

    def add_article_thumbnail(self):
        count = 0
        for name,article in self.news.items():
            if len(article.artists) == 0:
                if len(article.albums) == 0:
                    self.s.delete(article)
        self.s.commit()


if __name__ == '__main__':
    # Create engine/session
    engine = create_engine('postgresql+psycopg2://postgres:downing@localhost:5432/', echo=True)
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    s = Session()

    # Class to insert data
    di = DataInserter(s)
    di.add_article_thumbnail()

    '''
    # Load and update artists
    with open('artists.json', 'r') as f:
        artist_data = json.load(f)
    di.update_artists(artist_data)
    # Load and update albums
    with open('albums.json', 'r') as f:
        album_data = json.load(f)
    di.update_albums(album_data)
    di.add_album_popularity()
    # Load and update news
    with open('news.json', 'r') as f:
        news_data = json.load(f)
    di.update_news(news_data)
    '''
