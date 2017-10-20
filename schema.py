from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Date, Table, ForeignKey
from sqlalchemy.orm import relationship
from functools import partial
Base = declarative_base()

# Apply defaults to a new Column
DColumn = partial(Column, nullable=False)

articles_artists = Table('articles_artists', Base.metadata,
			DColumn('article_id', String, ForeignKey('articles.article_id')),
			DColumn('artist_id', String, ForeignKey('artists.artist_id')))

articles_albums = Table('articles_albums', Base.metadata,
			DColumn('article_id', String, ForeignKey('articles.article_id')),
			DColumn('album_id', String, ForeignKey('albums.album_id')))

genres_artists = Table('genres_artists', Base.metadata,
			DColumn('genre_id', String, ForeignKey('genres.genre_id')),
			DColumn('artist_id', String, ForeignKey('artists.artist_id')))

cities_artists = Table('cities_artists', Base.metadata,
			DColumn('city_id', String, ForeignKey('cities.city_id')),
			DColumn('artist_id', String, ForeignKey('artists.artist_id')))

class Artist(Base):
	__tablename__ = "artists"

	artist_id = DColumn(String, primary_key=True)
	name = DColumn(String)
	spotify_link = DColumn(String, unique=True)
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

class Album(Base):
	__tablename__ = "albums"

	album_id = DColumn(String, primary_key=True)
	name = DColumn(String)
	spotify_link = DColumn(String, unique=True)
	release_date = DColumn(Date)
	album_picture_link = DColumn(String, unique=True)
	artist_id = DColumn(String, ForeignKey("artists.artist_id"))
	articles = relationship(
		'Article',
		secondary=articles_albums,
		back_populates='albums')

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
	spotify_link = DColumn(String, unique=True)
	album_id = DColumn(Integer, ForeignKey("albums.album_id"), primary_key=True)

class Region(Base):
	__tablename__ = "regions"

	state = DColumn(String, primary_key=True)
	region = DColumn(String)

class Article(Base):
	__tablename__ = "articles"

	article_id = DColumn(String, primary_key=True)
	title = DColumn(String)
	media_link = DColumn(String, unique=True)
	date = DColumn(Date)
	upvotes = DColumn(Integer)
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

	city_id = DColumn(String, primary_key=True)
	name = DColumn(String)
	population = DColumn(Integer)
	city_picture_link = DColumn(String, unique=True)
	state = DColumn(String, ForeignKey("regions.state"))
	artists = relationship(
		'Artist',
		secondary=cities_artists,
		back_populates='cities')