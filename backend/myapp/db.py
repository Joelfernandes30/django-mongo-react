from pymongo import MongoClient

def get_mongo_client():
    return MongoClient("mongodb+srv://ed-tech:techmiya@cluster0.ofgnlod.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
