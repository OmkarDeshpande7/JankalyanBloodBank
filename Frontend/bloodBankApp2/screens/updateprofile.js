import React from "react";
import * as Expo from "expo";
import { ip } from "./host.js";
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

import Overlay from "react-native-modal-overlay";

import {
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";

import { Cards } from "react-native-elements";

import { Button } from "react-native-elements";
import RadioGroup from "react-native-radio-buttons-group";
import DateTimePicker from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { ImagePicker, Permissions } from "expo";

export default class updateprofile extends React.Component {
  data = this.props.navigation.getParam("data");
  token = this.props.navigation.getParam("token");

  constructor(props) {
    super(props);
    this.state = {
      email: this.data.email,
      name: this.data.name,
      PhoneNumber: this.data.phone,
      dob: this.data.dob,
      gender: this.data.gender,
      address: this.data.address,
      bg: this.data.bg,
      profilePic: this.data.profilePic,
      profession: this.data.profession,
      education: this.data.education,
      secondPhoneNumber: this.data.emergencyContact,
      officeAddress: this.data.officeAddress,
      aadhar: this.data.aadhar,
      error: "",
      data1: [
        {
          label: "Male",
          layout: "row",
          value: "Male"
        },
        {
          label: "Female",
          layout: "row",
          value: "Female"
        }
      ],
      isDateTimePickerVisible: false,
      overlayVisible: false
    };
  }

  static navigationOptions = {
    title: "Update Profile"
  };

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
        source={{
          uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
        }}
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
              placeholder="Full Name*"
              value={this.state.name}
              underlineColorAndroid="transparent"
              onChangeText={name => this.setState({ name: name })}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={this.state.email}
              underlineColorAndroid="transparent"
              onChangeText={email => this.setState({ email })}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Address*"
              autoCapitalize="none"
              value={this.state.address}
              underlineColorAndroid="transparent"
              onChangeText={address =>
                this.setState({
                  address: address
                })
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Alternate Contact Number"
              autoCapitalize="none"
              value={this.state.secondPhoneNumber}
              underlineColorAndroid="transparent"
              onChangeText={s =>
                this.setState({
                  secondPhoneNumber: s
                })
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Education*"
              autoCapitalize="none"
              value={this.state.education}
              underlineColorAndroid="transparent"
              onChangeText={e => this.setState({ education: e })}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Profession*"
              autoCapitalize="none"
              value={this.state.profession}
              underlineColorAndroid="transparent"
              onChangeText={a => this.setState({ profession: a })}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Office/College/School Address*"
              autoCapitalize="none"
              value={this.state.officeAddress}
              underlineColorAndroid="transparent"
              onChangeText={address =>
                this.setState({
                  officeAddress: address
                })
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Aadhar Number*"
              autoCapitalize="none"
              value={this.state.aadhar}
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
          <View
            style={{
              alignSelf: "flex-start",
              marginLeft: 25
            }}
          >
            <RadioGroup
              radioButtons={this.state.data1}
              flexDirection="row"
              onPress={data1 => {
                this.setState({ data1 });
                let g = this.state.data1.find(e => e.selected === true).value;
                if (g === "Male") {
                  this.setState({ gender: true });
                } else {
                  this.setState({
                    gender: false
                  });
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
            style={[styles.buttonContainer, styles.loginButton]}
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
                this.formData.append("profession", this.state.profession);
                this.formData.append("officeAddress", this.state.officeAddress);
                this.formData.append("education", this.state.education);
                this.formData.append(
                  "emergencyContact",
                  this.state.emergencyContact
                );
                this.formData.append("adhaarNo", this.state.adhaarNo);

                fetch(ip + "/userUpdate/" + this.data.id + "/", {
                  method: "put",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    Authorization: "Token " + this.token
                  },
                  body: this.formData
                })
                  .then(response => {
                    alert(response.status + " - " + response._bodyText);
                    if (response.status === 400) {
                      console.log("Error");
                      this.setState({
                        error: response._bodyText
                      });
                    } else if (response.status === "201") {
                      console.log("Registered");
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
          >
            <Text style={styles.loginText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

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

AppRegistry.registerComponent("bloodBankApp2", () => updateprofile);
