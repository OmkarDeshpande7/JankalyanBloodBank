import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AppRegistry,
  ScrollView,
  ListItem
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

export default class Profile extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      token: this.props.navigation.getParam("token"),
      name: "",
      email: "",
      phone: "",
      bg: "",
      dob: "",
      address: ""
    };
  }

  componentDidMount() {
    fetch("http://192.168.0.105:8000/profile.json", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + this.state.token
      }
    })
      .then(response => {
        obj = JSON.parse(response._bodyInit)[0];
        this.setState({
          name: obj.first_name + " " + obj.last_name,
          email: obj.email,
          phone: obj.phone,
          dob: obj.dob,
          bg: obj.bloodGroup,
          address: obj.address,
          profilePic: obj.profilePic
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header} />
        <Image style={styles.avatar} source={{ uri: this.state.profilePic }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.state.name}</Text>
            <Text style={styles.info}>Blood Group: {this.state.bg}</Text>
            <View style={styles.viewDesc}>
              <Icon name="phone" size={20} />
              <Text style={styles.description}>{this.state.phone}</Text>
            </View>
            <View style={styles.viewDesc}>
              <Icon name="envelope" size={20} />
              <Text style={styles.description}>{this.state.email}</Text>
            </View>

            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Update Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Option 2</Text>
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
    height: 200
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
    marginTop: 130
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
  }
});

AppRegistry.registerComponent("bloodBankApp2", () => Profile);
