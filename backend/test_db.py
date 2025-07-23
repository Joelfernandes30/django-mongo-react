from pymongo import MongoClient
client = MongoClient("mongodb+srv://ed-tech:techmiya@cluster0.ofgnlod.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client['ed-tech']
print(list(db['users'].find()))
print("not found")
