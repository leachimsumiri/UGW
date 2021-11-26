from flask import Flask, current_app
from flask_restful import Resource, Api, reqparse
from supabase import create_client, Client
#import pandas as pd
#import ast

# --------------------------------------------------------------------------------------------------

def create_rest():
    app = Flask(__name__)
    api = Api(app)

    # Setup with the configuration provided
    app.config.from_object('config.DevelopmentConfig')

    # Add Endpoints
    api.add_resource(Events, '/events')
    api.add_resource(Locations, '/locations')

    # Inject Supabase
    app.sbClient = create_client(app.config['SUPABASE_URL'], app.config['SUPABASE_KEY'])

    return app

# --------------------------------------------------------------------------------------------------

class Events(Resource):
    def get(self):
        data = current_app.sbClient.table("events").select("*").execute()
        assert len(data.get("data", [])) > 0
        return {'data': data}, 200  # return data and 200 OK 
    
    
class Locations(Resource):
    def get(self):
        #data = pd.read_csv('users.csv')  # read CSV
        #data = data.to_dict()  # convert dataframe to dictionary
        data = current_app.sbClient.table("locations").select("*").execute()
        assert len(data.get("data", [])) > 0
        return {'data': data}, 200  # return data and 200 OK 
    
# --------------------------------------------------------------------------------------------------

if __name__ == "__main__":
    create_rest().run()