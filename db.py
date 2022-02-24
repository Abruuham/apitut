from multiprocessing import Condition
from flask_mysqldb import MySQL
from app import app
import configparser

mysql = MySQL()

config = configparser.ConfigParser()
config.read('config.ini')

db_settings = config['DB_SETTINGS']

app.config['MYSQL_HOST'] = db_settings['MYSQL_HOST']
app.config['MYSQL_USER'] = db_settings['MYSQL_USER']
app.config['MYSQL_PASSWORD'] = db_settings['MYSQL_PASSWORD']
app.config['MYSQL_DB'] = db_settings['MYSQL_DB']

mysql.init_app(app)