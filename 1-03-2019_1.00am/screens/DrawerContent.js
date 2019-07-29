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

import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

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
        title: "Home",
        icon: <AntDesign name="home" size={25} color={"gray"} />
      },
      {
        id: 1,
        title: "Search",
        icon: <EvilIcons name="search" size={25} color={"gray"} />
      },
      {
        id: 2,
        title: "Logout",
        icon: <SimpleLineIcons name="logout" size={25} color={"gray"} />
      },
      {
        id: 3,
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
        id: 4,
        title: "Contact Us",
        icon: <AntDesign name="mail" size={25} color={"gray"} />
      },
      {
        id: 5,
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
                    alert("navigate here to search");
                  }
                  if (item.id === 2) {
                    this.props.nav.navigate("login");
                    this.props.close();
                  }
                  if (item.id === 3) {
                    this.props.nav.navigate("AboutUs");
                    this.props.close();
                  }
                  if (item.id === 4) {
                    this.props.nav.navigate("Contact");
                    this.props.close();
                  }
                  if (item.id === 5) {
                    alert("navigate here to invite Us");
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
