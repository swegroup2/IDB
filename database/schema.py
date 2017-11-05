from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, Table, ForeignKey
from sqlalchemy.orm import relationship
from functools import partial
from flask.ext.jsontools import JsonSerializableBase

Base = declarative_base(cls=(JsonSerializableBase,))

# Apply defaults to a new Column
DColumn = partial(Column, nullable=False)

articles_artists = Table('articles_artists', Base.metadata,
                         DColumn('article_id', Integer, ForeignKey('articles.article_id'), primary_key=True),
                         DColumn('artist_id', Integer, ForeignKey('artists.artist_id'), primary_key=True))

articles_albums = Table('articles_albums', Base.metadata,
                        DColumn('article_id', Integer, ForeignKey('articles.article_id'), primary_key=True),
                        DColumn('album_id', Integer, ForeignKey('albums.album_id'), primary_key=True))

genres_artists = Table('genres_artists', Base.metadata,
                       DColumn('genre_id', Integer, ForeignKey('genres.genre_id'), primary_key=True),
                       DColumn('artist_id', Integer, ForeignKey('artists.artist_id'), primary_key=True))

cities_artists = Table('cities_artists', Base.metadata,
                       DColumn('city_id', Integer, ForeignKey('cities.city_id'), primary_key=True),
                       DColumn('artist_id', Integer, ForeignKey('artists.artist_id'), primary_key=True))


class Artist(Base):
    __tablename__ = "artists"

    artist_id = DColumn(Integer, primary_key=True)
    name = DColumn(String)
    spotify_id = DColumn(String, unique=True)
    artist_picture_link = DColumn(String, unique=True)
    popularity = DColumn(Integer)
    articles = relationship(
        'Article',
        secondary=articles_artists,
        back_populates='artists')
    cities = relationship(
        'City',
        secondary=cities_artists,
        back_populates='artists')
    genres = relationship(
        'Genre',
        secondary=genres_artists,
        back_populates='artists')
    albums = relationship("Album")

    # def __json__(self):
    # 	return ['artist_id','name','spotify_id','artist_picture_link','popularity']


class Album(Base):
    __tablename__ = "albums"

    album_id = DColumn(Integer, primary_key=True)
    name = DColumn(String)
    spotify_id = DColumn(String, unique=True)
    release_date = DColumn(Date)
    album_picture_link = DColumn(String)
    artist_id = DColumn(Integer, ForeignKey("artists.artist_id"))
    articles = relationship(
        'Article',
        secondary=articles_albums,
        back_populates='albums')

    # def __json__(self):
    # 	return ['album_id','name','spotify_id','release_date','album_picture_link','artist_id']


class Genre(Base):
    __tablename__ = "genres"
    name = DColumn(String, unique=True)
    genre_id = DColumn(Integer, primary_key=True)
    artists = relationship(
        'Artist',
        secondary=genres_artists,
        back_populates='genres')


class Track(Base):
    __tablename__ = "tracks"

    name = DColumn(String, primary_key=True)
    track_number = DColumn(Integer)
    spotify_id = DColumn(String)
    album_id = DColumn(Integer, ForeignKey("albums.album_id"), primary_key=True)


class Region(Base):
    __tablename__ = "regions"

    state = DColumn(String, primary_key=True)
    region = DColumn(String)


class Article(Base):
    __tablename__ = "articles"

    article_id = DColumn(Integer, primary_key=True)
    title = DColumn(String)
    media_link = DColumn(String, unique=True)
    date = DColumn(Date)
    upvotes = DColumn(Integer)
    thumbnail = DColumn(String)
    albums = relationship(
        'Album',
        secondary=articles_albums,
        back_populates='articles')
    artists = relationship(
        'Artist',
        secondary=articles_artists,
        back_populates='articles')


class City(Base):
    __tablename__ = "cities"

    city_id = DColumn(Integer, primary_key=True)
    name = DColumn(String)
    population = DColumn(Integer)
    city_picture_link = DColumn(String)
    state = DColumn(String, ForeignKey("regions.state"))
    artists = relationship(
        'Artist',
        secondary=cities_artists,
        back_populates='cities')
