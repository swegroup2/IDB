CREATE TABLE artists (
  artist_id           VARCHAR NOT NULL,
  name                VARCHAR NOT NULL,
  spotify_link        VARCHAR NOT NULL,
  artist_picture_link VARCHAR NOT NULL,
  popularity          INTEGER NOT NULL,
  PRIMARY KEY (artist_id),
  UNIQUE (spotify_link),
  UNIQUE (artist_picture_link)
);
CREATE TABLE genres (
  name     VARCHAR NOT NULL,
  genre_id INTEGER NOT NULL,
  PRIMARY KEY (genre_id),
  UNIQUE (name)
);
CREATE TABLE regions (
  state  VARCHAR NOT NULL,
  region VARCHAR NOT NULL,
  PRIMARY KEY (state)
);
CREATE TABLE articles (
  article_id VARCHAR NOT NULL,
  title      VARCHAR NOT NULL,
  media_link VARCHAR NOT NULL,
  date       DATE    NOT NULL,
  upvotes    INTEGER NOT NULL,
  PRIMARY KEY (article_id),
  UNIQUE (media_link)
);
CREATE TABLE articles_artists (
  article_id VARCHAR NOT NULL,
  artist_id  VARCHAR NOT NULL,
  PRIMARY KEY (article_id, artist_id),
  FOREIGN KEY (article_id) REFERENCES articles (article_id),
  FOREIGN KEY (artist_id) REFERENCES artists (artist_id)
);
CREATE TABLE genres_artists (
  genre_id  VARCHAR NOT NULL,
  artist_id VARCHAR NOT NULL,
  PRIMARY KEY (genre_id, artist_id),
  FOREIGN KEY (genre_id) REFERENCES genres (genre_id),
  FOREIGN KEY (artist_id) REFERENCES artists (artist_id)
);
CREATE TABLE albums (
  album_id           VARCHAR NOT NULL,
  name               VARCHAR NOT NULL,
  spotify_link       VARCHAR NOT NULL,
  release_date       DATE    NOT NULL,
  album_picture_link VARCHAR NOT NULL,
  artist_id          VARCHAR NOT NULL,
  PRIMARY KEY (album_id),
  UNIQUE (spotify_link),
  UNIQUE (album_picture_link),
  FOREIGN KEY (artist_id) REFERENCES artists (artist_id)
);
CREATE TABLE cities (
  city_id           VARCHAR NOT NULL,
  name              VARCHAR NOT NULL,
  population        INTEGER NOT NULL,
  city_picture_link VARCHAR NOT NULL,
  state             VARCHAR NOT NULL,
  PRIMARY KEY (city_id),
  UNIQUE (city_picture_link),
  FOREIGN KEY (state) REFERENCES regions (state)
);
CREATE TABLE articles_albums (
  article_id VARCHAR NOT NULL,
  album_id   VARCHAR NOT NULL,
  PRIMARY KEY (article_id, album_id),
  FOREIGN KEY (article_id) REFERENCES articles (article_id),
  FOREIGN KEY (album_id) REFERENCES albums (album_id)
);
CREATE TABLE cities_artists (
  city_id   VARCHAR NOT NULL,
  artist_id VARCHAR NOT NULL,
  PRIMARY KEY (city_id, artist_id),
  FOREIGN KEY (city_id) REFERENCES cities (city_id),
  FOREIGN KEY (artist_id) REFERENCES artists (artist_id)
);
CREATE TABLE tracks (
  name         VARCHAR NOT NULL,
  track_number INTEGER NOT NULL,
  spotify_link VARCHAR NOT NULL,
  album_id     INTEGER NOT NULL,
  PRIMARY KEY (name, album_id),
  UNIQUE (spotify_link),
  FOREIGN KEY (album_id) REFERENCES albums (album_id)
);
