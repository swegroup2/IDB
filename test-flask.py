import unittest
import os
import json
from database.schema import *
from sqlalchemy import MetaData
from flask import jsonify

artists = {
        'kanye':Artist(name="Kanye", spotify_id="spotify:kanye", artist_picture_link="//kanye", popularity=100),
        'jayz':Artist(name="Jay-Z", spotify_id="spotify:jayz", artist_picture_link="//jayz", popularity=90),
        'frank':Artist(name="Frank Ocean", spotify_id="spotify:frank", artist_picture_link="//frank", popularity=95),
        'sza':Artist(name="SZA", spotify_id="spotify:sza", artist_picture_link="//sza", popularity=90)
}

class TestEndpoints(unittest.TestCase):
    def setUp(self):
        # Connect to in memory test DB
        os.environ["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
        import main as main_app
        self.app = main_app
        self.client = main_app.app.test_client()
        Base.metadata.create_all(self.app.db.engine)

    def tearDown(self):
        # Clear database
        Base.metadata.drop_all(self.app.db.engine)

    def test_artists_top_no_limit(self):
        # Add data
        self.app.db.session.add(artists['kanye'])
        self.app.db.session.add(artists['jayz'])
        self.app.db.session.commit()

        res = self.client.get("/api/artists/top")
        top_artists = json.loads(res.data)
        assert(len(top_artists) == 2)

    def test_artists_top_limit_0(self):
        # Add data
        self.app.db.session.add(artists['kanye'])
        self.app.db.session.add(artists['jayz'])
        self.app.db.session.commit()

        res = self.client.get("/api/artists/top/0")
        top_artists = json.loads(res.data)
        assert(len(top_artists) == 1)

if __name__ == '__main__':
    unittest.main()
