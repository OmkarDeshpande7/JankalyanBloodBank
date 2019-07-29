import React from "react";
import { ip } from "./host.js";
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking
} from "react-native";

import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Button, SocialIcon, ListItem } from "react-native-elements";

import { SecureStore } from "expo";

export default class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const list = [
      {
        id: 0,
        title: "Home",
        icon: <AntDesign name="home" size={25} color={"gray"} />
      },
      {
        id: 1,
        title: "Logout",
        icon: <SimpleLineIcons name="logout" size={25} color={"gray"} />
      },
      {
        id: 2,
        title: "About Us",
        icon: (
          <Ionicons
            name="ios-information-circle-outline"
            size={25}
            color={"gray"}
          />
        )
      },
      {
        id: 3,
        title: "Contact Us",
        icon: <AntDesign name="mail" size={25} color={"gray"} />
      },
      {
        id: 4,
        title: "Invite Friends",
        icon: <AntDesign name="plus" size={25} color={"gray"} />
      }
    ];
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.innerHead}>
            <View
              style={{
                flexDirection: "row",
                flex: 1
              }}
            >
              {this.props.profilePic ? (
                <Image
                  style={styles.avatar}
                  source={{
                    uri: this.props.profilePic
                  }}
                />
              ) : (
                <Image
                  style={styles.avatar}
                  source={{
                    uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
                  }}
                />
              )}
              <View>
                <Text style={styles.name}>{this.props.name}</Text>
                <Text style={styles.description}>
                  Blood Group: {this.props.bloodGroup}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <ScrollView style={{}}>
          <View>
            {list.map((item, i) => (
              <TouchableOpacity
                onPress={() => {
                  if (item.id === 0) {
                    this.props.nav.navigate("Home");
                    this.props.close();
                  }

                  if (item.id === 1) {
                    this.props.nav.navigate("login");
                    SecureStore.setItemAsync("isLoggedIn", "false").then(
                      response => {
                        console.log("saved");
                      }
                    );
                    SecureStore.deleteItemAsync("token").then(response => {
                      console.log("Deleted");
                      fetch(ip + "/setNotificationToken/", {
                        method: "post",
                        headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json",
                          Authorization: "Token " + this.props.token
                        },
                        body: JSON.stringify({
                          token: ""
                        }),
                        credentials: "include"
                      })
                        .then(r => {
                          if (r.status === 200) {
                            console.log("Notification token deleted");
                          }
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    });
                    this.props.close();
                  }
                  if (item.id === 2) {
                    this.props.nav.navigate("AboutUs");
                    this.props.close();
                  }
                  if (item.id === 3) {
                    this.props.nav.navigate("Contact");
                    this.props.close();
                  }
                  if (item.id === 4) {
                    alert("Coming soon...");
                  }
                }}
              >
                <ListItem
                  title={item.title}
                  titleStyle={{ paddingLeft: 10 }}
                  leftIcon={item.icon}
                  rightIcon={{ name: null }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 30,
              justifyContent: "space-around",
              paddingBottom: 20
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Linking.canOpenURL(
                  "https://www.facebook.com/JankalyanBBP/"
                ).then(supported => {
                  if (supported) {
                    Linking.openURL("https://www.facebook.com/JankalyanBBP/");
                  } else {
                    console.log(
                      "Don't know how to open URI: " +
                        "https://www.facebook.com/JankalyanBBP/"
                    );
                  }
                });
              }}
            >
              <SocialIcon type="facebook" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  innerHead: {
    height: 150,
    backgroundColor: "#660000"
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "flex-start",
    marginTop: 20,
    marginHorizontal: 20
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "bold",
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 10
  },
  description: {
    fontSize: 18,
    color: "#fff",
    textAlign: "left",
    marginLeft: 5
  },
  info: {
    fontSize: 16,
    color: "#fff"
  },
  viewDesc: {
    flexDirection: "row",
    flex: 1
  }
});

AppRegistry.registerComponent("ReactNativeProject", () => DrawerContent);
