import unittest
import os
import json
from database.data import *
from database.schema import *
from sqlalchemy import MetaData
from flask import jsonify

def get_Artists():
    return [
        {   'name':'travis',
            'popularity':97,
            'artist_picture_link':'//travis',
            'artist_id':'spotify:travis',
            'genres':['hip hop', 'rap'] },
        {   'name':'drake',
            'popularity':100,
            'artist_picture_link':'//drake',
            'artist_id':'spotify:drake',
            'genres':['pop', 'rap'] } ]

class TestDatabaseFunctions(unittest.TestCase):
    def setUp(self):
        # Connect to in memory test DB
        os.environ["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
        import main as main_app
        self.app = main_app
        self.client = main_app.app.test_client()
        Base.metadata.create_all(self.app.db.engine)
        self.artist_data = get_Artists()

    def tearDown(self):
        # Clear database
        Base.metadata.drop_all(self.app.db.engine)

    # Test get top artists no limit
    def test_update_artists(self):
        di = DataInserter(self.app.db.session)
        di.update_artists(self.artist_data)
        self.assertEqual(len([art for art in self.app.db.session.query(Artist)]), 2)
        self.assertEqual(len([g for g in self.app.db.session.query(Genre)]), 3)

if __name__ == '__main__':
    unittest.main()

