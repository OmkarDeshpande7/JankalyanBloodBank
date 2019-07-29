from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.generics import UpdateAPIView
from .serializers import *
from rest_framework import generics, status
from rest_framework.response import Response
from twilio.rest import Client
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser
from collections import namedtuple
from django.contrib.auth import authenticate, login, logout
from django.core.mail import EmailMessage


# Create your views here.
def index(request):
    return render(request, 'login.html')


def sendSmsAndEmail(request):
    users = CustomUser.objects.all()
    for user in users:
        email = EmailMessage('Jankalyan blood bank alert', 'Email from jankalyan blood bank', to=[user.email])
        email.send()
        account_sid = 'AC83dde2f67b767323e2ad9f11cae52a67'
        auth_token = '3501bf6737be8a4c91a082768320eeac'
        client = Client(account_sid, auth_token)
        sms = client.messages.create(
            from_="+12056490939",
            body="this is message sent to you by omkar from django",
            to="+91" + str(user.phone)
        )
        print(sms.sid)
    return HttpResponse("message google sent")


class UserUpdateView(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_queryset(self):
        return CustomUser.objects.all()


class Register(APIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Profile(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get_queryset(self):
        return CustomUser.objects.filter(phone=self.request.user.phone)


class Groups(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        GroupTuple = namedtuple("Groups", ('yourGroups', 'otherGroups'))

        yourGroups = request.user.group_set.all()
        otherGroups = Group.objects.exclude(user=request.user)

        group = GroupTuple(yourGroups=yourGroups, otherGroups=otherGroups)
        serializer = GroupViewSerializer(group)
        return Response(serializer.data, status=status.HTTP_200_OK)


class Friend(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        phone = request.data["phone"]
        u = CustomUser.objects.get(phone=phone)
        u.friendRequests.add(request.user)
        return Response(status=status.HTTP_200_OK)

    def get_queryset(self):
        return self.request.user.friends.all()


class FriendRequest(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        phone = request.data["phone"]
        u = CustomUser.objects.get(phone=phone)

        if request.user.friendRequests.filter(phone=u.phone).exists():
            request.user.friendRequests.remove(u)
            request.user.friends.add(u)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        return self.request.user.friendRequests.all()


class FeedView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        Feed = namedtuple("Feed", ('groupPosts', 'profilePosts', 'formPosts'))
        groups = request.user.group_set.all()
        friends = request.user.friends.all()
        groupPostList = set()
        profilePostList = []
        formPostList = set()

        for g in groups:
            for i in g.grouppost_set.all().order_by('-id')[:3]:
                groupPostList.add(i)

            for j in g.formpost_set.all().order_by('-id')[:3]:
                formPostList.add(j)
        profilePostList += request.user.profilepost_set.all().order_by('-id')[:2]
        for f in friends:
            profilePostList += f.profilepost_set.all().order_by('-id')[:4]

        # groupPostList = list(groupPostList)
        # formPostList = list(formPostList)
        # profilePostList.reverse()
        # groupPostList.reverse()
        # formPostList.reverse()
        feed = Feed(groupPosts=groupPostList, profilePosts=profilePostList, formPosts=formPostList)
        serializer = FeedSerializer(feed)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetGroupPosts(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        Posts = namedtuple("Feed", ('groupPosts', 'formPosts'))
        g = Group.objects.get(pk=pk)
        gp = g.grouppost_set.all().order_by("-id")
        fp = g.formpost_set.all().order_by("-id")

        groupPosts = Posts(groupPosts=gp, formPosts=fp)
        serializer = GroupPageSerializer(groupPosts)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProfileView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        ProfileTuple = namedtuple("Profile", ('suggestions', 'profilePosts'))

        posts = request.user.profilepost_set.all().order_by('-id')

        friends = request.user.friends.all() | CustomUser.objects.filter(
            phone=request.user.phone) | request.user.friendRequests.all()
        s = CustomUser.objects.difference(friends)
        profile = ProfileTuple(suggestions=s[:5], profilePosts=posts)
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PostProfile(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProfilePostSerializer

    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        p = ProfilePost.objects.create(user=request.user, postDetails=request.data["postDetails"])
        try:
            p.image = request.data["image"]
        except():
            p.image = None
        p.save()
        return Response(status=status.HTTP_201_CREATED)


class FriendListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        FriendTuple = namedtuple("Friend", ('friends', 'friendRequests'))

        friend = FriendTuple(friendRequests=request.user.friendRequests.all(), friends=request.user.friends.all())
        serializer = ProfileSerializer(friend)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LikePost(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        id = request.data["id"]
        p = ProfilePost.objects.get(pk=id)
        p.likes = p.likes + 1
        p.save()
        return Response(status=status.HTTP_200_OK)


class JoinGroup(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        group = Group.objects.get(pk=request.data["group"])
        user = request.user
        group.pendingGroupRequest.add(user)
        group.save()
        return Response(status=status.HTTP_200_OK)


def logged(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)
        if user is not None and user.is_superuser:
            if user.is_active:
                login(request, user)
                return redirect("../admin-panel/")
        else:
            return redirect('/')
    else:
        return redirect('/')


def adminPanel(request):
    if request.user.is_authenticated:
        requests = []
        groups = Group.objects.all()
        posts = FormPost.objects.all()
        for group in groups:
            requests += group.pendingGroupRequest.all()
        return render(request, 'admin-panel.html', {'requests': requests, 'groups': groups, 'posts': posts})
    else:
        return redirect("/")


class AddGroupPost(APIView):
    queryset = GroupPost.objects.all()
    serializer_class = GroupPostSerializerAdmin

    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        serializer = GroupPostSerializerAdmin(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse('post created')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateGroup(APIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializerAdmin

    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        serializer = GroupSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse('Group Created Successfully !')
        return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GroupUpdateView(UpdateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializerAdmin


def acceptGroupRequest(request, userid, groupid):
    user = CustomUser.objects.get(id=userid)
    group = Group.objects.get(id=groupid)
    group.pendingGroupRequest.remove(user)
    group.user.add(user)
    requests = []
    groups = Group.objects.all()
    posts = FormPost.objects.all()
    for group in groups:
        requests += group.pendingGroupRequest.all()
    return render(request, 'admin-panel.html', {'requests': requests, 'groups': groups, 'posts': posts})


def removeUser(request, userid, groupid):
    user = CustomUser.objects.get(id=userid)
    group = Group.objects.get(id=groupid)
    group.user.remove(user)
    requests = []
    groups = Group.objects.all()
    posts = FormPost.objects.all()
    for group in groups:
        requests += group.pendingGroupRequest.all()
    return render(request, 'admin-panel.html', {'requests': requests, 'groups': groups, 'posts': posts})


class createFormPost(APIView):
    queryset = FormPost.objects.all()
    serializer_class = FormPostSerializer

    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        serializer = FormPostSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            requests = []
            groups = Group.objects.all()
            posts = FormPost.objects.all()
            for group in groups:
                requests += group.pendingGroupRequest.all()
            return render(request, 'admin-panel.html', {'requests': requests, 'groups': groups, 'posts': posts})
        return HttpResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class getFormResponse(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = FormDataSerializer

    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        p = FormData.objects.create(user=request.user, time=request.data["time"])
        p.post = FormPost.objects.get(pk=request.data["id"])
        p.save()
        return Response(status=status.HTTP_201_CREATED)


class GetFormPosts(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        g = Group.objects.get(pk=pk)
        gp = g.formpost_set.all()
        serializer = FormPostSerializer(gp, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class getFriendPosts(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        p = CustomUser.objects.get(pk=pk)
        posts = p.profilepost_set.all()

        serializer = ProfilePostFriendSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


def logoutAdmin(request):
    if request.user.is_authenticated:
        logout(request)
        return redirect("../")

def forgotPassword(request):

    return JsonResponse({},status=200)
