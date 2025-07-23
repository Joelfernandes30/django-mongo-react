from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from .db import get_mongo_client

class RegisterView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        data = request.data
        if not all(field in data for field in ('username', 'email', 'password')):
            return Response({"error": "Required fields missing"}, status=400)
        client = get_mongo_client()
        db = client['ed-tech']
        users = db['users']

        if users.find_one({'username': data['username']}):
            client.close()
            return Response({"error": "Username exists"}, status=400)
        if users.find_one({'email': data['email']}):
            client.close()
            return Response({"error": "Email exists"}, status=400)

        user_doc = {
            'username': data['username'],
            'email': data['email'],
            'password': make_password(data['password']),
        }
        print("Inserting user:", user_doc)  # DEBUG
        try:
            users.insert_one(user_doc)
        except Exception as e:
            print("Error inserting:", e)
            client.close()
            return Response({"error": str(e)}, status=500)
        client.close()
        return Response({"message": "User registered"}, status=201)
