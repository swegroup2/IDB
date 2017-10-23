from sqlalchemy import create_engine, insert
from sqlalchemy.orm import sessionmaker
from schema import Artist, Album, Genre, Track, Region, Article, City
import json

with open('artists.json', 'r') as f:
    data = json.load(f)

# create engine
my_engine = create_engine('postgresql://scott:tiger@localhost/')

# create a configured session
Session = sessionmaker(bind=my_engine)
session = Session()

# work with sess
myobject = MyObject('foo', 'bar')
session.add(myobject)
session.commit()

