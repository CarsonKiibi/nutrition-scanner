from django.urls import path 
from . import views 

urlpatterns = [
    path('hello-world/', views.hello_world, name='hello_world'),
    path('result_of_process', views.result_of_process, name='result_of_process'),
]