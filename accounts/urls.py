from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.home1,name='home1'),
    path('signup',views.signup,name='signup'),
    path('login',views.login_user,name='login'),
    path('acc',views.acc_create,name='acc'),
    path('logout',views.logout,name='logout'),
    path('contact',views.contactpage,name='contact'),
    path('display',views.display,name='display'),
    path('display2',views.display2,name='display2'),
    path('download/', views.download_file),
    path('download1/', views.download_file1),
    path('downloadpdf/', views.download_pdf),
    path('download1pdf2/', views.download_pdf2),
]
