from django.urls import path, include

from . import views

app_name = 'api'

urlpatterns = [
    path('profile/detail/<int:pk>/', views.UserProfileRetieveUpdateDestroyAPIView.as_view(), name='profile-detail'),
    path('profile/update/<int:pk>/', views.UserProfileRetieveUpdateDestroyAPIView.as_view(), name='profile-update'),
    path('profile/create/', views.UserProfileCreateAPIView.as_view(), name='profile-create'),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/login/', views.CustomAuthToken.as_view(), name='login'),
    path('rest-auth/', include('rest_auth.urls')),
    ]
