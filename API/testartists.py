import unittest
import os
import json
from database.schema import *
from sqlalchemy import MetaData
from flask import jsonify

def get_Artists():
    return {
        'travis':Artist(name="Travis Scott", spotify_id="spotify:travis", artist_picture_link="//travis", popularity=97), 'drake':Artist(name="Drake", spotify_id="spotify:drizzy", artist_picture_link="//drizzy", popularity=100), 'kanye':Artist(name="Kanye", spotify_id="spotify:kanye", artist_picture_link="//kanye", popularity=99),
        'jayz':Artist(name="Jay-Z", spotify_id="spotify:jayz", artist_picture_link="//jayz", popularity=90),
        'frank':Artist(name="Frank Ocean", spotify_id="spotify:frank", artist_picture_link="//frank", popularity=95),
        'beyonce':Artist(name="Beyonce", spotify_id="spotify:beyonce", artist_picture_link="//beyonce", popularity=92),
        'post':Artist(name="Post Malone", spotify_id="spotify:post", artist_picture_link="//post", popularity=94),
        'carti':Artist(name="Playboi Carti", spotify_id="spotify:carti", artist_picture_link="//carti", popularity=86),
        'thugger':Artist(name="Young Thug", spotify_id="spotify:thugger", artist_picture_link="//thugger", popularity=87),
        'future':Artist(name="Future", spotify_id="spotify:future", artist_picture_link="//future", popularity=89),
        'sza':Artist(name="SZA", spotify_id="spotify:sza", artist_picture_link="//sza", popularity=90)}

class TestArtistEndpoints(unittest.TestCase):
    def setUp(self):
        # Connect to in memory test DB
        os.environ["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
        import main as main_app
        self.app = main_app
        self.client = main_app.app.test_client()
        Base.metadata.create_all(self.app.db.engine)
        self.artists = get_Artists()

    def tearDown(self):
        # Clear database
        Base.metadata.drop_all(self.app.db.engine)

    # Test get top artists no limit
    def test_artists_top_1(self):
        for name, artist in self.artists.items():
            self.app.db.session.add(artist)
        self.app.db.session.commit()

        res = self.client.get("/api/artists/top")
        top_artists = json.loads(res.data)
        self.assertEqual(len(top_artists), 10)

    # Test get top artists limit 0
    def test_artists_top_2(self):
        self.app.db.session.add(self.artists['kanye'])
        self.app.db.session.add(self.artists['jayz'])
        self.app.db.session.commit()

        res = self.client.get("/api/artists/top/0")
        top_artists = json.loads(res.data)
        self.assertEqual(len(top_artists), 1)

    # Test get top artists limit higher than #rows
    def test_artists_top_3(self):
        for name, artist in self.artists.items():
            self.app.db.session.add(artist)
        self.app.db.session.commit()

        res = self.client.get("/api/artists/top/20")
        top_artists = json.loads(res.data)
        self.assertEqual(len(top_artists), 11)

    # Test get top artists limit lower than #rows
    def test_artists_top_4(self):
        for name, artist in self.artists.items():
            self.app.db.session.add(artist)
        self.app.db.session.commit()

        res = self.client.get("/api/artists/top/5")
        top_artists = json.loads(res.data)
        self.assertEqual(len(top_artists), 5)

    # Test get all artists
    def test_artists_all_1(self):
        self.app.db.session.add(self.artists['kanye'])
        self.app.db.session.add(self.artists['jayz'])
        self.app.db.session.commit()

        res = self.client.get("/api/artists")
        artists = json.loads(res.data)
        self.assertEqual(len(artists), 2)

    # Test get all artists with empty table
    def test_artists_all_2(self):
        res = self.client.get("/api/artists")
        artists = json.loads(res.data)
        self.assertEqual(len(artists), 0)

    # Test get artist by id exists
    def test_artist_1(self):
        self.app.db.session.add(self.artists['kanye'])
        self.app.db.session.add(self.artists['jayz'])
        self.app.db.session.commit()

        res = self.client.get("/api/artists/1")
        artists = json.loads(res.data)
        self.assertEqual(len(artists), 1)

    # Test get artist by id doesn't exist
    def test_artist_2(self):
        self.app.db.session.add(self.artists['kanye'])
        self.app.db.session.add(self.artists['jayz'])
        self.app.db.session.commit()

        res = self.client.get("/api/artists/5")
        self.assertEqual(res.status_code, 404)

if __name__ == '__main__':
    unittest.main()
