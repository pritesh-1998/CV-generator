from django.contrib import admin
from django.urls import path, include
from create import views as createviews
from . import views as homeviews
from accounts import views
from django.conf.urls import url
from django.views.static import serve
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('',homeviews.home),
    path('', include('accounts.urls')),
    path('', include('create.urls'), name='form_name')
]
