from django.urls import path
from . import views

urlpatterns = [
    path('query/', views.run_query),
    path('raw-query/', views.run_raw_query),
]