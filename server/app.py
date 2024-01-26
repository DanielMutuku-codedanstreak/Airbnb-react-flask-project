# import os

from flask import Flask
from flask_migrate import Migrate

from models import db,User,Property, Reservation



from views import *
from flask_jwt_extended import JWTManager
from datetime import timedelta


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://airbnb_database_snlc_user:UvZReTdssWGOVzLeNpcQaeTbkbQgwx3c@dpg-cmpce62cn0vc73cn9090-a.oregon-postgres.render.com/airbnb_database_snlc'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)

jwt = JWTManager()
app.config['JWT_SECRET_KEY'] = "JCVscYUAYTEF6WFCYDSAVCYSDVC7W"
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
jwt.init_app(app)


@app.route('/')
def index():
   return 'ok'

# views
app.register_blueprint(prop_bp)
app.register_blueprint(res_bp)
app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)


# JWT LOADER
@jwt.token_in_blocklist_loader
def token_in_blocklist_callback(jwt_header, jwt_data):
    jti = jwt_data['jti']
    token = TokenBlocklist.query.filter_by(jti=jti).first()
    if token:
        return token 
    else:
        return None


if __name__ == '__main__':
   app.run(port=5000, debug=True)