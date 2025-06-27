from django.urls import path
from . import views
from .views import update_dustbin_fill_level

urlpatterns = [
    path('', views.home, name='home'),
    path('register/', views.register_view, name='register'),
    path('dashboard/auth/login.html', views.login_view, name='login'),
    path('admin/dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('citizen/dashboard/', views.citizen_dashboard, name='citizen_dashboard'),
    path('api/dustbins/', views.dustbin_data, name='dustbin_data'),
    path('dustbins/', views.get_dustbins, name='get_dustbins'),
    path('report/', views.report_dustbin, name='report_dustbin'),
    path('about/', views.about_view, name='about'),
    path('contact/', views.contact_view, name='contact'),
    path('privacy-policy/', views.privacy_view, name='privacy-policy'),
    path('api/update-dustbin/', update_dustbin_fill_level),
    path('reward/', views.reward_view, name='reward'),
    path('citizen/report/', views.report_page, name='report'),
    path('citizen/recycling/', views.recycling_view, name='recycling'),
    path('update-dustbin/', update_dustbin_fill_level, name='update_dustbin'),
    path('update-dustbin-fill/', views.update_dustbin_fill_level),
    path('driver/', views.driver_dashboard, name='driver_dashboard'),

]
