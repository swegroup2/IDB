from schema import *
from sqlalchemy import create_engine
engine = create_engine('sqlite:///:memory:', echo=True)

Base.metadata.create_all(engine)