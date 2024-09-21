from django.urls import path
from . import views  # Import views from the current app

urlpatterns = [
    # path('dashboard/', views.dashboard),  
    path('signup/', views.register_view),  
    path('signin/', views.login_view),  
    path('auth-user/', views.check_auth_view),
    path('donate/', views.donate_view),
    path('crisis/', views.crisis_view),
    path('get_crisis/', views.get_crisis_view),
    path('get_volunteer/', views.get_volunteer_view),
    path('get_auth_user/', views.get_auth_user_view),
    path('signout/', views.signout_view),
    path('update_task/', views.update_task_view),
    path('get_chart_data/', views.get_chart_data_view),
    # path('ahsan/', views.ahsan_view),
]
