from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('<path:path>', index),  # Catch-all pattern to handle client-side routing
]
