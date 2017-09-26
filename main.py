# [START app]
import logging

from flask import Flask
from flask import jsonify

app = Flask(__name__)

@app.route('/api/hello')
def show_hello():
    return 'Poupon? :)'

# "RESTful" JSON API
@app.route('/api/echo/<string:what>')
def show_echo(what):
    return jsonify({'text': what})

@app.route('/api/cities')
def show_cities():
    return 'dsfsdfThis is where we display cities!!!'

@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500
# [END app]
