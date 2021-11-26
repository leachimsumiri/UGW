import os

class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = '57e19ea558d4967a552d03deece34a70' # nicht ganz so secret eher unique
    # SQLALCHEMY_TRACK_MODIFICATIONS = False # for SQL use later on (possibly), for now SB!
    SUPABASE_URL = os.environ['SUPABASE_URL']
    SUPABASE_KEY = os.environ['SUPABASE_KEY']
    
class ProductionConfig(Config):
    DEBUG = False
    # SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') # getting db via environment

class DevelopmentConfig(Config):
    ENV = "development"
    DEVELOPMENT = True
    DEBUG = True

#SQLALCHEMY_DATABASE_URI="sqlite:///development_database.db" # for later direct use of a db