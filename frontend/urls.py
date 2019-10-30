from django.urls import path

from .views import IndexView

app_name = 'frontend'

urlpatterns = [
    path('profile/<int:pk>', IndexView.as_view(), name='profile-details'),
    path('profile/create/', IndexView.as_view(), name='index'),
    path('signup/', IndexView.as_view(), name='index'),
    path('login/', IndexView.as_view(), name='index'),
    path('', IndexView.as_view(), name='index'),
]
