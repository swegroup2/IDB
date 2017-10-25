from flask import jsonify

def sql_serialize(cls, *inst) :
	def convert(item) : 
		if item is not None:
			return item
		return str()
	return [{col.name : convert(getattr(i, col.name)) for col in cls.__table__.columns} for i in inst]

def sql_json(cls, *inst) : 
	return jsonify(sql_serialize(cls, *inst))