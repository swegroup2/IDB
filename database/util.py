from flask import jsonify
from sqlalchemy.ext.declarative import DeclarativeMeta

def convert(item):
    if item is not None:
        return item
    return str()


def sql_serialize(cls, *inst):
    return [{col.name: convert(getattr(i, col.name)) for col in cls.__table__.columns} for i in inst]


def sql_single_serialize(cls,inst):
	return {col.name: convert(getattr(inst, col.name)) for col in cls.__table__.columns}

def related_col_serialize(vals,*inst):
    return [dict(zip(vals,i)) for i in inst]


def sql_json(cls, *inst):
    return jsonify(sql_serialize(cls, *inst))


def sql_multi_join(*inst):
	# for list in inst:
	# 	for collection in list:
	return [[sql_single_serialize(collection,collection) for collection in lt] for lt in inst]


# Error json if object not found
def not_found():
    return jsonify({'Error': 'Resource not found.'})
