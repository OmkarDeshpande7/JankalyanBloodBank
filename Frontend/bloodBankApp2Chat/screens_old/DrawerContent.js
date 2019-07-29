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
        id: 0,
        type: "MaterialIcons",
        title: "Home",
        icon: "home"
      },
      {
        id: 1,
        type: "MaterialIcons",
        title: "Search",
        icon: "search"
      },
      {
        id: 2,
        title: "Logout",
        type: "MaterialCommunityIcons",
        icon: "home"
      },
      {
        id: 3,
        type: "MaterialIcons",
        title: "About Us",
        icon: "home"
      },
      {
        id: 4,
        type: "MaterialIcons",
        title: "Contact Us",
        icon: "phone"
      },
      {
        id: 5,
        type: "Entypo",
        title: "Invite Friends",
        icon: "home"
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
                    alert("navigate here to groups");
                  }
                  if (item.id === 2) {
                    alert("navigate here to search");
                  }
                  if (item.id === 3) {
                    alert("navigate here to logout");
                  }
                  if (item.id === 4) {
                    this.props.nav.navigate("AboutUs");
                    this.props.close();
                  }
                  if (item.id === 5) {
                    alert("navigate here to contact us");
                  }
                  if (item.id === 6) {
                    alert("navigate here to invite");
                  }
                }}
              >
                <ListItem
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
              justifyContent: "space-around",
              paddingBottom: 20
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
