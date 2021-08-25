from django.shortcuts import render
from rest_framework import generics, status
from .models import Room
from .serializers import RoomSerializer, CreateRoomSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class CreateRoomView(APIView):
    # serializer_class = CreateRoomSerialiser
    def post(self, request):
        # create a session key if it doesn't exit
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()


        serializer = CreateRoomSerializer(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.validated_data['guest_can_pause']
            vote_to_skip = serializer.validated_data['vote_to_skip']
            # uses the session key as the host since session keys are unique
            host = self.request.session.session_key
            # verifies if the host has a room 
            # if True -> update the room
            # if False -> create a new room
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.vote_to_skip = vote_to_skip
                room.save(update_fields=['guest_can_pause', 'vote_to_skip'])
            else:
                room = Room(host=host,guest_can_pause=guest_can_pause,vote_to_skip=vote_to_skip)
                room.save()
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

class LeaveRoomView(APIView):
    def delete(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            raise Exception("You are not an active user")
        host = self.request.session.session_key
        queryset = Room.objects.filter(host=host)
        if queryset.exists():
            room = queryset[0]
            room.delete()
        return Response({"response": "Left the room"}, status=status.HTTP_204_NO_CONTENT)
 