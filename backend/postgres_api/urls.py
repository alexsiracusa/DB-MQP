from django.urls import path
from . import views

urlpatterns = [
    path('media/', views.get_media),
    path('media-list-entry/', views.create_media_list_entry, name='create_media_list_entry'),
    path('media-list-entry/<int:entry_id>/', views.update_media_list_entry, name='update_media_list_entry'),
    path('media-list-entry/<int:entry_id>/delete/', views.delete_media_list_entry, name='delete_media_list_entry'),
    path('media-list-entries/', views.media_list_entries),
    path('media-lists/', views.get_media_lists),
    path('studio/', views.get_studio),
    path('staff/', views.get_staff),
    path('character/', views.get_character),
    path('user-stats/', views.get_user_stats),
    path('account/', views.get_account),
]
