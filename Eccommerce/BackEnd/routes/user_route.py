from flask import Blueprint
from controllers.user_controller import user_blueprint  # Import the blueprint directly

user_route_blueprint = Blueprint('user_route', __name__)

# Register the user blueprint
user_route_blueprint.register_blueprint(user_blueprint)
