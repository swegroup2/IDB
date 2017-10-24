import unittest
import os
from database.schema import *
from flask import jsonify
import json

class TestEndpoints(unittest.TestCase):
	def setUp(self):
		# TODO: connect to test db? Maybe create separate testcase.
		os.environ["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
		import main as main_app
		self.app = main_app #DB and app (should be just DB)
		self.client = main_app.app.test_client()


		Base.metadata.create_all(self.app.db.engine)

		# Create some sample data
		hiphop = Genre(name="Hip Hop")
		genres = [hiphop]

		kanye = Artist(name="Kanye", spotify_id="spotify:kanye", artist_picture_link="//kanye", popularity=100)
		jayz = Artist(name="Jay-Z", spotify_id="spotify:jayz", artist_picture_link="//jayz", popularity=90)
		kanye.genres += [hiphop]
		jayz.genres += [hiphop]
		artists = [kanye, jayz]

		items = [*artists, *genres]

		for item in items:
			self.app.db.session.add(item)
		self.app.db.session.commit()

	def test_artists_top(self):
		# TODO: improve
		res = self.client.get("/api/artists/top")
		json_Obj = json.loads(res.data)
		print(json.dumps(json_Obj,indent=4,sort_keys=True))

if __name__ == '__main__':
	unittest.main()