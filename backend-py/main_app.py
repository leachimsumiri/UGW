# INFO: For later improvement of direct app implementation (instead of REST endpoint / solely backend)

# from flask import Flask
# from database import database

# # blueprint imports not used here
# #from apps.app1.views import app1
# #from apps.app2.views import app2

# from apps.views import app

# def create_app():
#     app = Flask(__name__)

#     # setup with the configuration provided
#     app.config.from_object('config.DevelopmentConfig')
    
#     # setup all our dependencies
#     database.init_app(app)
    
#     # register blueprint
#     app.register_blueprint(app1)
#     app.register_blueprint(app2, url_prefix="/app2")
    
#     return app

# if __name__ == "__main__":
#     create_app().run()
