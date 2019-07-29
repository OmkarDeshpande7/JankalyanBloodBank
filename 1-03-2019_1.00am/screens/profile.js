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
  FlatList,
  ImageBackground,
  RefreshControl
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle:
        navigation.getParam("obj").first_name +
        " " +
        navigation.getParam("obj").last_name,
      headerStyle: {
        backgroundColor: "#660000"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#fff"
      }
    };
  };
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
      profilePic: obj.profilePic,
      secondPhoneNumber: obj.emergencyContact,
      aadhar: obj.adhaarNo,
      education: obj.education,
      profession: obj.profession,
      officeAddress: obj.officeAddress,
      data: [],
      refreshing:false
    };
  }

  name = this.state.name;
  _onRefresh = () => {
    this.setState({ refreshing: true });
    let obj = this.props.navigation.getParam("obj");
    fetch("http://192.168.43.18:8000/friendPosts/" + obj.id + "/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + this.state.token
      }
    })
      .then(response => {
        obj = JSON.parse(response._bodyInit);
        this.setState({
          data: obj
        });
        this.setState({ refreshing: false });

      })
      .catch(err => {
      });
  };
  componentDidMount() {
    let obj = this.props.navigation.getParam("obj");
    fetch("http://192.168.43.18:8000/friendPosts/" + obj.id + "/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + this.state.token
      }
    })
      .then(response => {
        obj = JSON.parse(response._bodyInit);
        this.setState({
          data: obj
        });
      })
      .catch(err => {
      });
  }

  render() {
    return (
      <ImageBackground
        source={require("../bg3.jpg")}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <ScrollView style={styles.container}
           refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <View style={styles.header} />
          {this.state.profilePic ? (
            this.props.navigation.getParam("type") === "2" ? (
              <Image
                style={styles.avatar}
                source={{
                  uri: "http://192.168.43.18:8000" + this.state.profilePic
                }}
              />
            ) : (
              <Image
                style={styles.avatar}
                source={{
                  uri: this.state.profilePic
                }}
              />
            )
          ) : (
            <Image
              style={styles.avatar}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
              }}
            />
          )}
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
                  fontWeight: "bold",
                  color: "black"
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
                  marginBottom: 0,
                  color: "black"
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
                  marginBottom: 0,
                  color: "black"
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
                  marginBottom: 0,
                  color: "black"
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
                  marginBottom: 0,
                  color: "black"
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
                  marginBottom: 0,
                  color: "black"
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
                  marginBottom: 0,
                  color: "black"
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
                  marginBottom: 0,
                  color: "black"
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
                  marginBottom: 0,
                  color: "black"
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
                  marginBottom: 0,
                  color: "black"
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
                  fontWeight: "bold",
                  color: "black"
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
                            uri: "http://192.168.43.18:8000" + item.image
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
                              <TouchableOpacity
                                style={styles.socialBarButton}
                                onPress={() => {
                                  fetch("http://192.168.43.66:8000/likePost/", {
                                    method: "post",
                                    headers: {
                                      Accept: "application/json",
                                      "Content-Type": "application/json",
                                      Authorization: "Token " + this.state.token
                                    },
                                    body: JSON.stringify({
                                      id: item.id
                                    })
                                  })
                                    .then(response => {
                                      if (response.status === 200) {
                                        this.setState((item.likes += 1));
                                      } else {
                                        alert("Try Again");
                                      }
                                    })
                                    .catch(err => {
                                    });
                                }}
                              >
                                <Image
                                  style={styles.icon}
                                  source={{
                                    uri:
                                      "https://png.icons8.com/material/96/2ecc71/thumb-up.png"
                                  }}
                                />
                                <Text style={styles.socialBarLabel}>
                                  {item.likes}
                                </Text>
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
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "transparent",
    height: 90
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
    marginTop: 40
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
    padding: 30,
    paddingHorizontal: 0
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
  },
  container: {
    flex: 1,
    padding: 0
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "transparent",
    paddingTop: 5,
    width: 300
  },
  separator: {
    marginTop: 5
  },
  /******** card **************/
  card: {
    shadowColor: "#00000000",
    shadowOffset: {
      width: 0
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    marginVertical: 0,
    backgroundColor: "white",
    borderRadius: 25
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor: "#EEEEEE"
  },
  cardImage: {
    flex: 1,
    height: 250,
    width: null
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1
  },
  description: {
    fontSize: 15,
    color: "#888",
    flex: 1,
    marginTop: 5,
    marginBottom: 5
  },
  time: {
    fontSize: 13,
    color: "#808080",
    marginTop: 5
  },
  icon: {
    width: 25,
    height: 25
  },
  iconData: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 5
  },
  timeContainer: {
    flexDirection: "row"
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1
  },
  socialBarSection: {
    justifyContent: "flex-end",
    flexDirection: "row",
    flex: 1
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: "flex-end",
    justifyContent: "center",
    paddingLeft: 10
  },
  socialBarButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  listContainer: {
    alignItems: "center"
  },
  /******** card **************/
  card: {
    shadowColor: "#00000000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 3,

    marginVertical: 2,
    backgroundColor: "rgba(255,255,255,0.9)",
    flexBasis: "46%",
    marginHorizontal: 1,
    borderRadius: 5,
    borderWidth: 0.1,
    borderColor: "rgba(0,0,0,0.1)"
  },
  cardFooter: {
    paddingBottom: 15,
    paddingTop: 0,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  cardContent: {
    paddingTop: 6,
    paddingBottom: 3,
    paddingHorizontal: 16
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "transparent",
    flex: 1
  },
  userImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    alignSelf: "center",
    borderColor: "#DCDCDC",
    borderWidth: 3
  },
  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: "center",
    color: "#008080",
    fontWeight: "bold"
  },
  position: {
    fontSize: 14,
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
    color: "#696969"
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 20
  },
  icon: {
    height: 20,
    width: 20
  }
});

AppRegistry.registerComponent("bloodBankApp2", () => Profile);
