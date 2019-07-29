import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Splash from "./screens/splash";
import SignIn from "./screens/login";
import Profile from "./screens/profile";
import Home from "./screens/home";
import FriendsList from "./screens/friendList";
import updateprofile from "./screens/updateprofile";
import PostForm from "./screens/post";
import AboutUs from "./screens/aboutUs";
import GroupPage from "./screens/groupPage";
import GroupPageChat from "./screens/groupPagechat";
import ProfileNotFriend from "./screens/profile2";
import Contact from "./screens/contact";
import GroupDescriptionPage from "./screens/groupPageList";
export default class App extends React.Component {
  render() {
    return <Screens />;
  }
}

const Screens = createAppContainer(
  createStackNavigator({
    splash: { screen: Splash },
    login: { screen: SignIn },
    Profile: {
      screen: Profile
    },
    Home: {
      screen: Home
    },
    FriendsList: {
      screen: FriendsList
    },
    updateprofile: {
      screen: updateprofile
    },
    Post: {
      screen: PostForm
    },
    AboutUs: {
      screen: AboutUs
    },
    GroupPage: {
      screen: GroupPageChat
    },
    GroupDescriptionPage: {
      screen: GroupDescriptionPage
    },
    AddProfile: {
      screen: ProfileNotFriend
    },
    Contact: {
      screen: Contact
    }
  })
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
