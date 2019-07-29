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

export default class Profile extends Component {
  state = {
    token: "",
    name: "",
    email: "",
    phone: "",
    bg: "",
    dob: "",
    address: "",
    profilePic: "",
    data: []
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

            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 20,
                marginLeft: 10,
                marginTop: 12,
                marginBottom: 3,
                fontWeight: "bold"
              }}
            >
              Details
            </Text>
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 15,
                marginLeft: 15,
                marginTop: 5,
                marginBottom: 0
              }}
            >
              Mobile Number: {this.state.phone}
            </Text>
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 15,
                marginLeft: 15,
                marginTop: 5,
                marginBottom: 0
              }}
            >
              Email: {this.state.email}
            </Text>
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 15,
                marginLeft: 15,
                marginTop: 5,
                marginBottom: 0
              }}
            >
              Alternate Mobile Number: {this.state.secondPhoneNumber}
            </Text>
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 15,
                marginLeft: 15,
                marginTop: 5,
                marginBottom: 0
              }}
            >
              Date of Birth: {this.state.dob}
            </Text>
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 15,
                marginLeft: 15,
                marginTop: 5,
                marginBottom: 0
              }}
            >
              Address: {this.state.address}
            </Text>
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 15,
                marginLeft: 15,
                marginTop: 5,
                marginBottom: 0
              }}
            >
              Aadhar: {this.state.aadhar}
            </Text>
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 15,
                marginLeft: 15,
                marginTop: 5,
                marginBottom: 0
              }}
            >
              Education: {this.state.education}
            </Text>
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 15,
                marginLeft: 15,
                marginTop: 5,
                marginBottom: 0
              }}
            >
              Profession: {this.state.profession}
            </Text>
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 15,
                marginLeft: 15,
                marginTop: 5,
                marginBottom: 0
              }}
            >
              Office Address: {this.state.officeAddress}
            </Text>
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 20,
                marginLeft: 10,
                marginTop: 15,
                marginBottom: 3,
                fontWeight: "bold"
              }}
            >
              Posts
            </Text>
            <View
              style={{
                flexDirection: "row",
                flex: 1
              }}
            >
              <FlatList
                style={[
                  styles.list,
                  {
                    flex: 1,
                    marginHorizontal: 0
                  }
                ]}
                data={this.state.data}
                keyExtractor={item => {
                  return item.id;
                }}
                ItemSeparatorComponent={() => {
                  return <View style={styles.separator} />;
                }}
                renderItem={post => {
                  const item = post.item;
                  if (item.image != null) {
                    image = (
                      <Image
                        style={styles.cardImage}
                        source={{
                          uri: "http://192.168.43.66:8000" + item.image.toString()
                        }}
                      />
                    );
                  } else {
                    image = null;
                  }
                  return (
                    <View style={styles.card}>
                      {image}
                      <View style={styles.cardHeader}>
                        <View style={{ flex: 1 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              flex: 1,
                              alignItems: "center"
                            }}
                          >
                            {item.user.profilePic ? (
                              <Image
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 15,
                                  marginLeft: 1,
                                  marginRight: 5
                                }}
                                source={{
                                  uri:
                                    "http://192.168.43.66:8000" +
                                    item.user.profilePic
                                }}
                              />
                            ) : null}
                            <Text style={styles.title}>
                              {item.user.first_name + " " + item.user.last_name}
                            </Text>
                          </View>

                          <Text style={styles.description}>
                            {item.postDetails}
                          </Text>
                          <View style={styles.timeContainer}>
                            <Image
                              style={styles.iconData}
                              source={{
                                uri:
                                  "https://png.icons8.com/color/96/3498db/calendar.png"
                              }}
                            />
                            <Text style={styles.time}>
                              {item.time.toString().substring(0, 10)}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.cardFooter}>
                        <View style={styles.socialBarContainer}>
                          <View style={styles.socialBarSection}>
                            <TouchableOpacity style={styles.socialBarButton}>
                              <Image
                                style={styles.icon}
                                source={{
                                  uri:
                                    "https://png.icons8.com/material/96/2ecc71/thumb-up.png"
                                }}
                              />
                              <Text style={styles.socialBarLabel}>78</Text>
                            </TouchableOpacity>
                          </View>
                          <View style={styles.socialBarSection}>
                            <TouchableOpacity style={styles.socialBarButton}>
                              <Image
                                style={styles.icon}
                                source={{
                                  uri:
                                    "https://png.icons8.com/ios-glyphs/75/2ecc71/comments.png"
                                }}
                              />
                              <Text style={styles.socialBarLabel}>25</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
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

AppRegistry.registerComponent("bloodBankApp2", () => Profile);
