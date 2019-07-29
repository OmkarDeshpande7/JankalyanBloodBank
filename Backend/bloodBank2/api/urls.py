"""bloodBank2 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index, name="index"),
    path('post/', views.Register.as_view()),
    path('profile/', views.Profile.as_view()),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('groups/', views.Groups.as_view()),
    path('friend/', views.Friend.as_view()),
    path('userUpdate/<int:pk>/', views.UserUpdateView.as_view()),
    path('friendRequests/', views.FriendRequest.as_view()),
    path('feed/', views.FeedView.as_view()),
    path('getProfileView/', views.ProfileView.as_view()),
    path('profilePost/', views.PostProfile.as_view()),
    path('friendList/', views.FriendListView.as_view()),
    path('getGroupPost/<int:pk>/', views.GetGroupPosts.as_view()),
    path('likePost/', views.LikePost.as_view()),
    path('joinGroup/', views.JoinGroup.as_view()),
    path('admin-post/', views.AddGroupPost.as_view()),
    path('group-add/', views.CreateGroup.as_view()),
    url(r'^group-update/(?P<pk>\d+)/$', views.GroupUpdateView.as_view()),
    url(r'^group-accept/(?P<userid>\d+)/(?P<groupid>\d+)/$', views.acceptGroupRequest),
    url(r'^group-reject/(?P<userid>\d+)/(?P<groupid>\d+)/$', views.removeUser),
    path('admin-login/', views.logged),
    path('admin-panel/', views.adminPanel),
    path('create-form-post/', views.createFormPost.as_view()),
    path('getFormPost/<int:pk>/', views.GetFormPosts.as_view()),
    path('send-response/', views.getFormResponse.as_view()),
    path('logout/', views.logoutAdmin),
    path('friendPosts/<int:pk>/', views.getFriendPosts.as_view()),
    path('search/<str:query>/', views.Search.as_view()),
    path('search//', views.SearchAll.as_view()),
    path('setNotificationToken/',views.SetNotificationToken.as_view()),
    path('forgotPassword/', views.forgotPassword),
    path('resetPassword/', views.resetPassword),
    path('reset/<id>/', views.setPassword)

]

urlpatterns = format_suffix_patterns(urlpatterns)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
