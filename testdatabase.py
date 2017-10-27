import unittest
import os
import json
import datetime
from database.data import *
from database.schema import *
from sqlalchemy import MetaData
from flask import jsonify


def get_Artists():
    return [
        {'name': 'travis',
         'popularity': 97,
         'artist_picture_link': '//travis',
         'artist_id': 'spotify:travis',
         'genres': ['hip hop', 'rap']},
        {'name': 'drake',
         'popularity': 100,
         'artist_picture_link': '//drake',
         'artist_id': 'spotify:drake',
         'genres': ['pop', 'rap']}]


def get_Albums():
    return [
        {'name': 'days before rodeo',
         'spotify_id': 'spotify:days',
         'release_date': datetime.utcnow(),
         'pic_URL': '//days',
         'artist_name': 'travis',
         'tracks': ['a', 'b', 'a'],
         'track_num': [1, 2, 3],
         'track_spotify_links': ['al', 'bl', 'cl']},
        {'name': 'if youre reading this its too late',
         'spotify_id': 'spotify:iyrtitl',
         'release_date': datetime.utcnow(),
         'pic_URL': '//iyrtitl',
         'artist_name': 'drake',
         'tracks': ['a', 'b', 'c'],
         'track_num': [1, 2, 3],
         'track_spotify_links': ['al', 'bl', 'cl']},
        {'name': 'if youre reading this its too late',
         'spotify_id': 'spotify:iyrtitl',
         'release_date': datetime.utcnow(),
         'pic_URL': '//iyrtitl',
         'artist_name': 'drake',
         'tracks': ['a', 'b', 'a'],
         'track_num': [1, 2, 3],
         'track_spotify_links': ['al', 'bl', 'cl']}]


class TestDatabaseFunctions(unittest.TestCase):
    def setUp(self):
        # Connect to in memory test DB
        os.environ["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
        import main as main_app
        self.app = main_app
        self.client = main_app.app.test_client()
        Base.metadata.create_all(self.app.db.engine)
        self.artist_data = get_Artists()
        self.album_data = get_Albums()

    def tearDown(self):
        # Clear database
        Base.metadata.drop_all(self.app.db.engine)

    # Test get top artists no limit
    def test_update_artists(self):
        di = DataInserter(self.app.db.session)
        di.update_artists(self.artist_data)
        self.assertEqual(len([art for art in self.app.db.session.query(Artist)]), 2)
        self.assertEqual(len([g for g in self.app.db.session.query(Genre)]), 3)

    def test_update_albums(self):
        di = DataInserter(self.app.db.session)
        di.update_artists(self.artist_data)
        di.update_albums(self.album_data)
        self.assertEqual(len([alb for alb in self.app.db.session.query(Album)]), 2)
        alb = self.app.db.session.query(Album, Album.album_id).filter_by(name='days before rodeo').first()
        self.assertEqual(len([t for t in self.app.db.session.query(Track).filter_by(album_id=alb.album_id)]), 2)
        alb = self.app.db.session.query(Album, Album.album_id).filter_by(
            name='if youre reading this its too late').first()
        self.assertEqual(len([t for t in self.app.db.session.query(Track).filter_by(album_id=alb.album_id)]), 3)


if __name__ == '__main__':
    unittest.main()
