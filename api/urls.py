from django.urls import path, include

from . import views

app_name = 'api'

urlpatterns = [
    # path('users/<int:pk>/', views.UserDetailAPIView.as_view()),
    path('users/', views.UserListAPIView.as_view()),
    path('profile/detail/', views.UserProfileListAPIView.as_view(), name='profile-detail'),
    # this is the url to view, update and delete a specific profile
    path('profile/<int:pk>/', views.UserProfileRetieveUpdateDestroyAPIView.as_view(), name='profile-update'),
    path('profile/create/', views.UserProfileCreateAPIView.as_view(), name='profile-create'),

    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/login/', views.CustomAuthToken.as_view(), name='login'),
    path('rest-auth/', include('rest_auth.urls')),
    ]
