import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AppRegistry,
  ScrollView,
  ListItem,
  FlatList
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

export default class ProfileNotFriend extends Component {
  state = {
    token: "",
    name: "",
    email: "",
    phone: "",
    bg: "",
    dob: "",
    address: "",
    profilePic: ""
  };

  constructor(props) {
    super(props);
    let obj = this.props.navigation.getParam("obj");
    this.state = {
      token: this.props.navigation.getParam("token"),
      name: obj.first_name + " " + obj.last_name,
      email: obj.email,
      phone: obj.phone,
      bg: obj.bloodGroup,
      dob: obj.dob,
      address: obj.address,
      profilePic: "http://192.168.43.66:8000" + obj.profilePic,
      secondPhoneNumber: obj.emergencyContact,
      aadhar: obj.adhaarNo,
      education: obj.education,
      profession: obj.profession,
      officeAddress: obj.officeAddress
    };
  }

  name = this.state.name;
  static navigationOptions = {
    title: this.name
  };
  componentDidMount() {}

  render() {
    console.log("Profile - " + this.state.token);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header} />
        <Image style={styles.avatar} source={{ uri: this.state.profilePic }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.Profilename}>{this.state.name}</Text>
            <Text style={styles.info}>Blood Group: {this.state.bg}</Text>
            <TouchableOpacity
              style={[
                styles.buttonContainer,
                {
                  backgroundColor: "#00b5ec",

                  shadowColor: "#808080",
                  shadowOffset: {
                    width: 0,
                    height: 9
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 12.35,

                  elevation: 19
                }
              ]}
              onPress={() => {
                fetch("http://192.168.43.66:8000/friend/", {
                  method: "post",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Token " + this.state.token
                  },
                  body: JSON.stringify({
                    phone: this.state.phone
                  })
                })
                  .then(response => {
                    if (response.status === 200) {
                      alert("Friend Request Sent!");
                    } else {
                      alert("Try Again");
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }}
            >
              {this.props.navigation.getParam("type") === "request" ? (
                <Text style={{ color: "white" }}>Accept Request</Text>
              ) : (
                <Text style={{ color: "white" }}>Add Friend</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#900",
    height: 120
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 70
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 18,
    color: "#696969",
    textAlign: "center",
    marginLeft: 10
  },
  viewDesc: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    marginTop: 10
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  },
  Profilename: {
    fontSize: 32,
    color: "#000",
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 2,
    alignSelf: "center"
  }
});

AppRegistry.registerComponent("bloodBankApp2", () => ProfileNotFriend);
