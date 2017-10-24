import unittest
import os
from database.schema import *

class TestEndpoints(unittest.TestCase):
	def setUp():
		# TODO: connect to test db? Maybe create separate testcase.
		os.environ["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
		import main as app
		self.app = app

		# Create some sample data
		hiphop = Genre(name="Hip Hop")
		genres = [hiphop]

		kanye = Artist(name="Kanye", spotify_id="spotify:kanye", artist_picture_link="//kanye", popularity=100)
		jayz = Artist(name="Jay-Z", spotify_id="spotify:jayz", artist_picture_link="//jayz", popularity=90)
		kanye.genres += [hiphop]
		jays.genres += [hiphop]
		artists = [kanye, jayz]

		items = [*artists, *genres]
		self.app.db.session.add(items)

	def test_artists_top(self):
		# TODO: improve
		res = self.app.show_artists_top(5)
		self.assertTrue(type(res) == str)
		self.assertTrue(len(res) > 0)

if __name__ == '__main__':
	unittest.main()