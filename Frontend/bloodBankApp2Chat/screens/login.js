import React from "react";
import { ip } from "./host.js";
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
  Animated,
  AsyncStorage,
  Linking
} from "react-native";
import {
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import Overlay from "react-native-modal-overlay";
import RadioGroup from "react-native-radio-buttons-group";
import DateTimePicker from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { ImagePicker, Permissions, Notifications, SecureStore } from "expo";
import Toast, { DURATION } from "react-native-easy-toast";
import { CheckBox } from "react-native-elements";

async function registerForPushNotificationsAsync(authToken) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  fetch(ip + "/setNotificationToken/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + authToken
    },
    body: JSON.stringify({
      token: token
    }),
    credentials: "include"
  })
    .then(response => {
      if (response.status === 200) {
        console.log("Registered for notifications");
      }
    })
    .catch(err => {
      console.log(err);
    });
}

export default class SignIn extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
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
                marginTop: 30,
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
            <Tabs
              screenProps={{
                rootNavigation: this.props.navigation
              }}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", checked: true };
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 30
        }}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Mobile Number"
            underlineColorAndroid="transparent"
            keyboardType="phone-pad"
            onChangeText={email => this.setState({ email })}
          />
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://img.icons8.com/nolan/40/000000/phone.png"
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            onChangeText={password => this.setState({ password })}
          />
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://img.icons8.com/nolan/40/000000/key.png"
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.btnKeepMeLoggedIn}
          onPress={() => this.onClickListener("restore_password")}
        >
          <CheckBox
            title="Keep Me Logged In"
            containerStyle={{
              backgroundColor: "transparent",
              borderWidth: 0
            }}
            textStyle={{
              color: "white"
            }}
            checked={this.state.checked}
            onPress={() => this.setState({ checked: !this.state.checked })}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnForgotPassword}
          onPress={() => {
            Linking.canOpenURL(ip + "/forgotPassword/").then(supported => {
              if (supported) {
                Linking.openURL(ip + "/forgotPassword/");
              } else {
                console.log(
                  "Don't know how to open URI: " + ip + "/forgotPassword/"
                );
              }
            });
          }}
        >
          <Text style={styles.btnText}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => {
            this.refs.toast.show("Signing In", 600);
            fetch(ip + "/api-token-auth/", {
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

                  if (this.state.checked) {
                    SecureStore.setItemAsync("isLoggedIn", "true").then(
                      response => {
                        console.log("saved");
                      }
                    );

                    SecureStore.setItemAsync("token", token).then(response => {
                      console.log("saved");
                    });
                    registerForPushNotificationsAsync(token);
                  } else {
                    SecureStore.setItemAsync("isLoggedIn", "false").then(
                      response => {
                        console.log("saved");
                      }
                    );
                  }

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
                this.refs.toast.show(err.toString(), 600);
              });
          }}
        >
          <Text style={styles.loginText}>Sign In</Text>
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
      </ScrollView>
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
      firstName: "",
      lastName: "",
      PhoneNumber: "",
      dob: "",
      gender: true,
      address: null,
      bg: "A+",
      profilePic: null,
      profession: "",
      education: "",
      secondPhoneNumber: "",
      officeAddress: "",
      aadhar: "",
      error: "",
      data: [
        { label: "Male", layout: "row", value: "Male" },
        { label: "Female", layout: "row", value: "Female" }
      ],
      isDateTimePickerVisible: false,
      overlayVisible: false
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

    console.log(result);
    if (!result.cancelled) {
      this.formData.append("profilePic", {
        uri: result.uri,
        name: "yourname.jpg",
        type: "image/jpg"
      });
      this.setState({ profilePic: result.uri });
    }
  };

  pickCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    console.log(result);

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
    const image1 = (
      <Image style={styles.avatar} source={{ uri: this.state.profilePic }} />
    );
    const image2 = (
      <Image
        style={styles.avatar}
        source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
      />
    );

    return (
      <KeyboardAwareScrollView animated={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 15
          }}
        >
          <Text style={{ color: "red", fontSize: 12 }}>{this.state.error}</Text>
          <Overlay
            visible={this.state.overlayVisible}
            onClose={() => {
              this.setState({ overlayVisible: false });
            }}
            closeOnTouchOutside
            style={{ backgroundColor: "rgba(0,0,0,0)" }}
          >
            <TouchableOpacity
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0)",
                  flex: 1,
                  width: 250,
                  paddingVertical: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: "black"
                }
              ]}
              onPress={async () => {
                await Permissions.askAsync(Permissions.CAMERA);

                this.pickCamera();
                this.setState({ overlayVisible: false });
              }}
            >
              <Text style={{ color: "black" }}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                {
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0)",
                  flex: 1,
                  width: 250,
                  paddingVertical: 20
                }
              ]}
              onPress={async () => {
                await Permissions.askAsync(Permissions.CAMERA_ROLL);
                this.pickImage();
                this.setState({ overlayVisible: false });
              }}
            >
              <Text style={{ color: "black" }}>Gallery</Text>
            </TouchableOpacity>
          </Overlay>
          <TouchableOpacity
            onPress={() => {
              //this.pickImage();
              this.setState({ overlayVisible: true });
            }}
            style={{
              marginBottom: 10
            }}
          >
            {this.state.profilePic ? image1 : image2}
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="First Name*"
              underlineColorAndroid="transparent"
              onChangeText={name => this.setState({ firstName: name })}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Last Name*"
              underlineColorAndroid="transparent"
              onChangeText={name => this.setState({ lastName: name })}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Mobile Number*"
              underlineColorAndroid="transparent"
              keyboardType="phone-pad"
              onChangeText={PhoneNumber =>
                this.setState({ PhoneNumber: PhoneNumber })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={email => this.setState({ email })}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={password => this.setState({ password: password })}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Confirm Password"
              secureTextEntry={true}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={password => this.setState({ cpassword: password })}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Address*"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={address => this.setState({ address: address })}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Alternate Contact Number"
              autoCapitalize="none"
              keyboardType="phone-pad"
              underlineColorAndroid="transparent"
              onChangeText={s => this.setState({ secondPhoneNumber: s })}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Education*"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={e => this.setState({ education: e })}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Profession*"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={a => this.setState({ profession: a })}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Office/College/School Address*"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={address =>
                this.setState({ officeAddress: address })
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Aadhar Number*"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={a => this.setState({ aadhar: a })}
            />
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={[
                styles.inputs,
                {
                  justifyContent: "center"
                }
              ]}
              onPress={this._showDateTimePicker}
            >
              <Text
                style={{
                  color: "black"
                }}
              >
                Date of Birth* {this.state.dob.toString()}
              </Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
          <Text
            style={{
              alignSelf: "flex-start",
              marginLeft: 30,
              marginTop: 2,
              marginBottom: 5,
              fontSize: 20,
              color: "#000",
              fontWeight: "bold"
            }}
          >
            Gender*
          </Text>
          <View style={{ alignSelf: "flex-start", marginLeft: 25 }}>
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
              marginLeft: 30,
              marginTop: 10,
              marginBottom: 2,
              fontSize: 20,
              color: "#000",
              fontWeight: "bold"
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
              marginLeft: 30
            }}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ bg: itemValue });
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
          <TouchableOpacity
            title="Sign Up"
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={async () => {
              const { status: existingStatus } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
              );
              let finalStatus = existingStatus;

              // only ask if permissions have not already been determined, because
              // iOS won't necessarily prompt the user a second time.
              if (existingStatus !== "granted") {
                // Android remote notification permissions are granted during the app
                // install, so this will only ask on iOS
                const { status } = await Permissions.askAsync(
                  Permissions.NOTIFICATIONS
                );
                finalStatus = status;
              }

              // Stop here if the user did not grant permissions
              if (finalStatus !== "granted") {
                alert("Not granted");
                return;
              }

              alert("Here");
              // Get the token that uniquely identifies this device
              let token = await Notifications.getExpoPushTokenAsync();
              alert(token);

              if (this.state.password === this.state.cpassword) {
                this.formData.append("first_name", this.state.firstName);
                this.formData.append("last_name", this.state.lastName);
                this.formData.append("email", this.state.email);
                this.formData.append("password", this.state.password);
                this.formData.append("address", this.state.address);
                this.formData.append("gender", this.state.gender);
                this.formData.append("bloodGroup", this.state.bg);
                this.formData.append("dob", this.state.dob);
                this.formData.append("phone", this.state.PhoneNumber);
                this.formData.append("education", this.state.education);
                this.formData.append("adhaarNo", this.state.aadhar);
                this.formData.append("profession", this.state.profession);
                this.formData.append(
                  "emergencyContact",
                  this.state.secondPhoneNumber
                );
                this.formData.append("officeAddress", this.state.officeAddress);
                this.formData.append("username", this.state.PhoneNumber);
                this.formData.append("pushToken", token);
                if (this.state.password === this.state.cpassword) {
                  if (this.state.firstName === "") {
                    alert("Firstname cannot be empty !");
                    return;
                  } else if (this.state.lastName === "") {
                    alert("Lastname cannot be empty !");
                    return;
                  } else if (this.state.firstName === "") {
                    alert("Firstname cannot be empty !");
                    return;
                  } else if (this.state.PhoneNumber.length !== 10) {
                    alert("Enter the valid phone number !");
                    return;
                  } else if (this.state.password === "") {
                    alert("Please set a valid password !");
                    return;
                  } else if (this.state.bg === "") {
                    alert("Blood Group cannot be empty !");
                    return;
                  } else if (this.state.gender === null) {
                    alert("Please set a valid gender !");
                    return;
                  } else if (this.state.secondPhoneNumber.length !== 10) {
                    alert("Please enter a valid emergency contact !");
                    return;
                  } else if (this.state.profilePic === null) {
                    alert("Please select a profile photo !");
                    return;
                  } else {
                    fetch(ip + "/post/", {
                      method: "post",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data"
                      },
                      body: this.formData
                    })
                      .then(response => {
                        if (response.status === 400) {
                          this.setState({ error: response._bodyText });
                          alert(this.state.error);
                        } else if (response.status === "201") {
                          alert("Registered");
                        }
                        fetch(ip + "/api-token-auth/", {
                          method: "post",
                          headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json"
                          },
                          body: JSON.stringify({
                            username: this.state.PhoneNumber,
                            password: this.state.password
                          }),

                          credentials: "include"
                        })
                          .then(response => {
                            if (response.status === 200) {
                              token = response._bodyInit.toString();
                              token = token.substring(10, token.length - 2);

                              this.props.screenProps.rootNavigation.navigate(
                                "Home",
                                {
                                  token: token
                                }
                              );
                            }
                          })
                          .catch(err => {
                            alert(err);
                          });
                      })
                      .catch(err => {});
                  }
                } else {
                  this.setState({
                    error: "Password and Confirm Password Do not Match!"
                  });
                }
              }
            }}
          >
            <Text style={styles.loginText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
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
          tabBarLabel: "Register"
        }
      }
    },
    {
      tabBarOptions: {
        labelStyle: {
          fontSize: 15,
          fontWeight: "bold"
        },
        tabStyle: {
          flex: 1
        },
        style: {
          backgroundColor: "transparent"
        },
        indicatorStyle: {
          backgroundColor: "#fff"
        }
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
  btnKeepMeLoggedIn: {
    height: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginBottom: 5,
    width: 300,
    marginTop: 5,
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

AppRegistry.registerComponent("bloodBankApp2", () => SignIn);
