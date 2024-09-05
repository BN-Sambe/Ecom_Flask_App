from flask import Flask
from config import Config
from models.db_init import db
from flask_cors import CORS
from routes.user_route import user_route_blueprint  # Use user_route blueprint

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)

db.init_app(app)

# Register blueprints
app.register_blueprint(user_route_blueprint)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
