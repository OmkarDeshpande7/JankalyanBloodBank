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
  ImageBackground
} from "react-native";

import {
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";

import { Cards } from "react-native-elements";

import { Button } from "react-native-elements";
import RadioGroup from "react-native-radio-buttons-group";
import DateTimePicker from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { ImagePicker } from "expo";
import Toast, { DURATION } from "react-native-easy-toast";
import { Login } from "./login";

export default class PostForm extends React.Component {
  static navigationOptions = {
    title: "Post"
  };

  constructor(props) {
    super(props);
    this.state = {
      photo: this.props.navigation.getParam("photo"),
      description: ""
    };
    if (this.state.photo) {
      this.formData.append("image", {
        uri: this.state.photo.uri,
        name: "name.jpg",
        type: "image/jpg"
      });
    }
  }

  formData = new FormData();

  render() {
    return (
      <ImageBackground
        source={require("../bg3.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            backgroundColor: "transparent",
            flex: 1,
            alignItems: "center"
          }}
        >
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Post Description"
                underlineColorAndroid="transparent"
                multiline={true}
                maxLength={500}
                onChangeText={e => this.setState({ description: e })}
              />
            </View>
            {this.state.photo ? (
              <Image
                style={{
                  flex: 1,
                  width: 320,
                  height: 70,
                  borderRadius: 8,
                  marginBottom: 15
                }}
                source={{
                  uri: this.state.photo.uri
                }}
              />
            ) : null}
            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => {
                this.refs.toast.show("Posting", 600);
                this.formData.append("postDetails", this.state.description);
                fetch("http://192.168.43.18:8000/profilePost/", {
                  method: "post",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    Authorization:
                      "Token " + this.props.navigation.getParam("token")
                  },
                  body: this.formData
                })
                  .then(response => {
                    if (response.status === 400) {
                      console.log("Error");
                      this.setState({ error: response._bodyText });
                    } else if (response.status === 201) {
                      this.props.navigation.navigate("Home");
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }}
            >
              <Text style={styles.loginText}>Post</Text>
            </TouchableOpacity>
            <Toast
              ref="toast"
              style={{ backgroundColor: "black", marginTop: 20 }}
              position="top"
              positionValue={200}
              fadeInDuration={750}
              fadeOutDuration={1000}
              opacity={0.8}
              textStyle={{ color: "white" }}
            />
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
    alignItems: "center",
    justifyContent: "center"
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
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "flex-start",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingVertical: 15
  },
  inputs: {
    marginLeft: 16,
    borderBottomColor: "transparent",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 50,
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

AppRegistry.registerComponent("bloodBankApp2", () => PostForm);
