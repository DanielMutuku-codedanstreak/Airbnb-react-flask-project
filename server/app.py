from flask import Flask
from flask_migrate import Migrate
from models import db,User,Property, Reservation

from views import *

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.sqlite"
db.init_app(app)
migrate = Migrate(app, db)



@app.route('/')
def index():
   return 'ok'

# views
app.register_blueprint(prop_bp)

if __name__ == '__main__':
   app.run(port=5000, debug=True)