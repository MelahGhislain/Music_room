from django.urls import  path
from . import views

urlpatterns = [
    path('', views.RoomView.as_view()),
    path('create-room/', views.CreateRoomView.as_view()),
    path('leave-room/', views.LeaveRoomView.as_view()),
]