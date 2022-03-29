from django.urls import path
from . import views
urlpatterns = [
    path('create/', views.sampleform, name="form"),
    path('create/template1/', views.template1display1, name="hello1"),
    path('create/template2/', views.template1display2, name="hello2"),
    path('create/template3/', views.template1display3, name="hello3")
    # path('template2/', views.download, name="hello"),
    # path('template3/', views.download, name="hello")
]
