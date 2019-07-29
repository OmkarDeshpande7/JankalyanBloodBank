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
  FlatList
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

export default class SignIn extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1
        }}
      >
        <View style={styles.container}>
          <Tabs
            screenProps={{
              rootNavigation: this.props.navigation
            }}
          />
        </View>
      </View>
    );
  }
}

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 30
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginVertical: 15,
            color: "#000"
          }}
        >
          Sign In
        </Text>
        <TextInput
          placeholder="Mobile Number"
          style={styles.textContainer}
          onChangeText={t => {
            this.setState({ email: t });
          }}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          style={styles.textContainer}
          onChangeText={t => {
            this.setState({ password: t });
          }}
        />

        <Button
          title="Sign In"
          buttonStyle={styles.buttonContainer}
          onPress={() => {
            fetch("http://192.168.43.66:8000/api-token-auth/", {
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
                  alert("Invalid Credentials");
                }
              })
              .catch(err => {
                alert(err);
              });
          }}
        />
      </View>
    );
  }
}

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      cpassword: "",
      name: "",
      PhoneNumber: "",
      dob: "",
      gender: true,
      address: null,
      bg: "A+",
      profilePic: "https://bootdey.com/img/Content/avatar/avatar6.png",
      error: "",
      data: [
        { label: "Male", layout: "row", value: "Male" },
        { label: "Female", layout: "row", value: "Female" }
      ],
      isDateTimePickerVisible: false
    };
  }

  processMonth = month => {
    if (month === "Jan") {
      return "01";
    } else if (month === "Feb") {
      return "02";
    } else if (month === "Mar") {
      return "03";
    } else if (month === "Apr") {
      return "04";
    } else if (month === "May") {
      return "05";
    } else if (month === "Jun") {
      return "06";
    } else if (month === "Jul") {
      return "07";
    } else if (month === "Aug") {
      return "08";
    } else if (month === "Sep") {
      return "09";
    } else if (month === "Oct") {
      return "10";
    } else if (month === "Nov") {
      return "11";
    } else if (month === "Dec") {
      return "12";
    }
  };

  _showDateTimePicker = () =>
    this.setState({
      isDateTimePickerVisible: true
    });

  _hideDateTimePicker = () =>
    this.setState({
      isDateTimePickerVisible: false
    });

  _handleDatePicked = date => {
    resultDate =
      date.toString().substring(11, 15) +
      "-" +
      this.processMonth(date.toString().substring(4, 7)) +
      "-" +
      date.toString().substring(8, 10);
    this.setState({ dob: resultDate });
    this._hideDateTimePicker();
  };

  formData = new FormData();

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.formData.append("profilePic", {
        uri: result.uri,
        name: "yourname.jpg",
        type: "image/jpg"
      });
      this.setState({ profilePic: result.uri });
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView animated={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 0
          }}
        >
          <Text
            style={{ fontSize: 30, fontWeight: "bold", marginVertical: 15 }}
          >
            Register
          </Text>

          <Text style={{ color: "red", fontSize: 12 }}>{this.state.error}</Text>

          <TouchableOpacity
            onPress={() => {
              this.pickImage();
            }}
          >
            <Image
              style={styles.avatar}
              source={{ uri: this.state.profilePic }}
            />
          </TouchableOpacity>

          <TextInput
            placeholder="Full Name*"
            secureTextEntry={false}
            style={styles.textContainer}
            onChangeText={t => {
              this.setState({ name: t });
            }}
          />
          <TextInput
            placeholder="Email*"
            secureTextEntry={false}
            autoCapitalize="none"
            style={styles.textContainer}
            onChangeText={t => {
              this.setState({ email: t });
            }}
          />
          <TextInput
            placeholder="Password*"
            secureTextEntry={true}
            autoCapitalize="none"
            style={styles.textContainer}
            onChangeText={t => {
              this.setState({ password: t });
            }}
          />

          <TextInput
            placeholder="Confirm Password*"
            secureTextEntry={true}
            autoCapitalize="none"
            style={styles.textContainer}
            onChangeText={t => {
              this.setState({ cpassword: t });
            }}
          />

          <TextInput
            placeholder="Mobile Number*"
            style={styles.textContainer}
            onChangeText={t => {
              this.setState({ PhoneNumber: t });
            }}
          />

          <TextInput
            onFocus={this.focusHandler}
            placeholder="Address*"
            autoCapitalize="none"
            style={styles.textContainer}
            onChangeText={t => {
              this.setState({ address: t });
            }}
          />

          <TouchableOpacity
            style={{
              marginTop: 20,
              height: 45,
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingLeft: 10,
              alignItems: "center",
              alignSelf: "flex-start",
              marginBottom: 20,
              width: 300,
              borderRadius: 5,
              borderBottomWidth: 1,
              textColor: "white",
              marginLeft: 15
            }}
            onPress={this._showDateTimePicker}
          >
            <Text style={{ color: "black" }}>
              Date of Birth* {this.state.dob.toString()}
            </Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />

          <Text
            style={{
              alignSelf: "flex-start",
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 5
            }}
          >
            Gender*
          </Text>
          <View style={{ alignSelf: "flex-start", marginLeft: 20 }}>
            <RadioGroup
              radioButtons={this.state.data}
              flexDirection="row"
              onPress={data => {
                this.setState({ data });
                let g = this.state.data.find(e => e.selected === true).value;
                if (g === "Male") {
                  this.setState({ gender: true });
                } else {
                  this.setState({ gender: false });
                }
              }}
            />
          </View>
          <Text
            style={{
              alignSelf: "flex-start",
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 5
            }}
          >
            Blood Group*
          </Text>
          <Picker
            selectedValue={this.state.bg}
            style={{
              height: 50,
              width: 100,
              alignSelf: "flex-start",
              borderWidth: 1,
              marginLeft: 20
            }}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ bg: itemValue });
              this.state.bg;
            }}
          >
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
            <Picker.Item label="AB+" value="AB-" />
            <Picker.Item label="AB-" value="AB+" />
          </Picker>

          <Button
            title="Sign Up"
            buttonStyle={styles.buttonContainer}
            onPress={() => {
              if (this.state.password === this.state.cpassword) {
                this.formData.append(
                  "first_name",
                  this.state.name.split(" ")[0]
                );
                this.formData.append(
                  "last_name",
                  this.state.name.split(" ")[1]
                );
                this.formData.append("email", this.state.email);
                this.formData.append("password", this.state.password);
                this.formData.append("address", this.state.address);
                this.formData.append("gender", this.state.gender);
                this.formData.append("bloodGroup", this.state.bg);
                this.formData.append("dob", this.state.dob);
                this.formData.append("phone", this.state.PhoneNumber);
                this.formData.append("username", this.state.PhoneNumber);

                fetch("http://192.168.1.6:8000/post/", {
                  method: "post",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data"
                  },
                  body: this.formData
                })
                  .then(response => {
                    alert(response.status + " - " + response._bodyText);
                    if (response.status === 400) {
                      this.setState({ error: response._bodyText });
                    } else if (response.status === "201") {
                      alert("Registered");
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                this.setState({
                  error: "Password and Confirm Password Do not Match!"
                });
              }
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
  focusHandler = () => {};
  uploadPic = () => {
    alert("You are fooled ! ");
  };
}

const Tabs = createAppContainer(
  createMaterialTopTabNavigator(
    {
      Login: {
        screen: Login,
        navigationOptions: {
          tabBarLabel: "Sign In"
        }
      },
      Register: {
        screen: Register,
        navigationOptions: {
          tabBarLabel: "Sign Up"
        }
      }
    },
    {
      labelStyle: {
        fontSize: 12
      },
      tabStyle: {
        width: 100
      },
      indicatorStyle: {},
      style: {
        backgroundColor: "rgba(0,0,0,0)"
      }
    }
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15
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
  }
});

AppRegistry.registerComponent("bloodBankApp2", () => SignIn);
