import React from "react";
import * as Expo from "expo";
import {
  Text,
  View,
  AppRegistry,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  Animated
} from "react-native";

import {
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";

import { Cards } from "react-native-elements";
import Overlay from "react-native-modal-overlay";

import { Button } from "react-native-elements";
import RadioGroup from "react-native-radio-buttons-group";
import DateTimePicker from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { ImagePicker, Permissions } from "expo";
import Toast, { DURATION } from "react-native-easy-toast";

export default class Contact extends React.Component {
  static navigationOptions = {
    title: "Contact Us"
  };
  constructor(props) {
    super(props);
    this.state = { name: "", mobile: "", message: "" };
  }

  render() {
    return (
      <ImageBackground
        source={require("../bg3.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            backgroundColor: "transparent",
            flex: 1
          }}
        >
          <View style={styles.container}>
            <Text
              style={{
                marginTop: 0,
                marginBottom: 30,
                fontSize: 30,
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                fontStyle: "italic"
              }}
            >
              Janakalyan Blood Bank
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Name"
                underlineColorAndroid="transparent"
                onChangeText={e => this.setState({ name: e })}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Mobile Number"
                underlineColorAndroid="transparent"
                onChangeText={e => this.setState({ mobile: e })}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Your Message"
                multiline={true}
                underlineColorAndroid="transparent"
                onChangeText={e => this.setState({ message: e })}
              />
            </View>

            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => {
                this.refs.toast.show("Signing In", 600);
                fetch("http://192.168.43.18:8000/api-token-auth/", {
                  method: "post",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                  },
                  body: JSON.stringify({
                    username: this.state.email,
                    password: this.state.password
                  }),

                  credentials: "include"
                })
                  .then(response => {
                    if (response.status === 200) {
                      token = response._bodyInit.toString();
                      token = token.substring(10, token.length - 2);
                      this.props.screenProps.rootNavigation.navigate("Home", {
                        token: token
                      });
                    } else {
                      this.refs.toast.show(
                        "Invalid Mobile Number or Password!",
                        600
                      );
                    }
                  })
                  .catch(err => {
                    alert(err);
                  });
              }}
            >
              <Text style={styles.loginText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    alignItems: "center"
  },
  buttonContainer: {
    marginTop: 20,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  },
  textContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    width: 300,
    borderBottomWidth: 1,
    borderRadius: 1
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 0.3,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "transparent",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent"
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 10,
    width: 300,
    backgroundColor: "transparent"
  },
  loginButton: {
    backgroundColor: "#00b5ec",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19
  },
  loginText: {
    color: "white"
  },

  btnText: {
    color: "white",
    fontWeight: "bold"
  }
});

AppRegistry.registerComponent("bloodBankApp2", () => Contact);
