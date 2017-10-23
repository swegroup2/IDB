from schema import *
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# engine = create_engine('sqlite:///:memory:', echo=True)
engine = create_engine('postgresql+psycopg2://postgres:downing@localhost:5432/', echo=True)
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)

# create a Session
session = Session()

hiphop = Genre(name="hip hop")
session.add(hiphop)

kanye = Artist(artist_picture_link="url", name="Kanye", spotify_id="spotify:kanye", popularity=100)
kanye.genres += [hiphop]
session.add(kanye)

session.commit()

