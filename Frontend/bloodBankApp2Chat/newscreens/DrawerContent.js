import React from "react";
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";

import Icon from "react-native-vector-icons/Entypo";

import { Button, SocialIcon, ListItem } from "react-native-elements";

export default class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const list = [
      {
        type: "MaterialIcons",
        title: "Home",
        icon: "home"
      },
      {
        type: "MaterialIcons",
        title: "My Groups",
        icon: "chat-bubble-outline"
      },
      {
        type: "MaterialIcons",
        title: "Search",
        icon: "search"
      },
      {
        title: "Logout",
        type: "MaterialCommunityIcons",
        icon: "logout"
      },
      {
        type: "MaterialIcons",
        title: "About Us",
        icon: "about"
      },
      {
        type: "MaterialIcons",
        title: "Contact Us",
        icon: "phone"
      },
      {
        type: "Entypo",
        title: "Invite Friends",
        icon: "squaredplus"
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
              <Image
                style={styles.avatar}
                source={{
                  uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
                }}
              />
              <View>
                <Text style={styles.name}>Kunal Chadha</Text>
                <Text style={styles.description}>Blood Group: B+</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <ScrollView style={{}}>
          <View>
            {list.map((item, i) => (
              <TouchableOpacity>
                <ListItem
                  key={i}
                  title={item.title}
                  leftIcon={{ name: item.icon, type: item.type }}
                  rightIcon={{ name: null }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 30,
              justifyContent: "space-around"
            }}
          >
            <SocialIcon type="facebook" />
            <SocialIcon type="instagram" />
            <SocialIcon type="twitter" />
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
