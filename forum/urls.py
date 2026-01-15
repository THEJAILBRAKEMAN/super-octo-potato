from django.urls import path

from . import views

urlpatterns = [
    path("", views.PostListView.as_view(), name="forum_list"),
    path("new/", views.PostCreateView.as_view(), name="forum_create"),
    path("<int:pk>/", views.PostDetailView.as_view(), name="forum_detail"),
    path("<int:pk>/edit/", views.PostUpdateView.as_view(), name="forum_edit"),
    path("<int:pk>/delete/", views.PostDeleteView.as_view(), name="forum_delete"),
]
