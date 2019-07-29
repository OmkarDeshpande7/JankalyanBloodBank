import React, { Component } from "react";
import { ip } from "./host.js";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  TextInput,
  ListView,
  AppRegistry,
  FlatList,
  TouchableOpacity
} from "react-native";

import FeatherIcon from "react-native-vector-icons/Feather";

export default class FriendsList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam("name"),
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
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      token: this.props.navigation.getParam("token"),
      data: this.props.navigation.getParam("friendRequests"),
      dataSource: ds.cloneWithRows(this.props.navigation.getParam("friends")),
      friends: {}
    };
  }

  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

  componentDidMount() {
    fetch(ip + "/search//", {
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
        console.log(err);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <Image
              style={[styles.icon, styles.inputIcon]}
              source={{
                uri: "https://png.icons8.com/search/androidL/100/000000"
              }}
            />
            <TextInput
              style={styles.inputs}
              ref={"txtPassword"}
              placeholder="Search"
              underlineColorAndroid="transparent"
              onChangeText={e => {
                fetch(ip + "/search/" + e + "/", {
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
                    console.log(err);
                  });
              }}
            />
          </View>
        </View>

        <FlatList
          style={{
            paddingHorizontal: 0,
            backgroundColor: "#fff",
            paddingVertical: 25
          }}
          contentContainerStyle={{
            alignItems: "center"
          }}
          data={this.state.data}
          vertical={true}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  marginVertical: 5,
                  width: 300,
                  backgroundColor: "white",
                  borderRadius: 5,
                  marginHorizontal: 10,
                  borderWidth: 0.3,
                  borderColor: "gray",
                  elevation: 0,
                  paddingHorizontal: 15
                }}
                onPress={() => {
                  this.props.navigation.navigate("AddProfile", {
                    obj: item,
                    type: "request",
                    token: this.state.token
                  });
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 12.5,
                    paddingBottom: 25,
                    paddingHorizontal: 16,
                    borderBottomLeftRadius: 1,
                    borderBottomRightRadius: 1
                  }}
                />

                {item.profilePic ? (
                  <Image
                    style={{
                      height: 90,
                      width: 90,
                      borderRadius: 60,
                      alignSelf: "center",
                      borderColor: "#DCDCDC",
                      borderWidth: 3
                    }}
                    source={{ uri: ip + item.profilePic }}
                  />
                ) : (
                  <Image
                    style={{
                      height: 90,
                      width: 90,
                      borderRadius: 60,
                      alignSelf: "center",
                      borderColor: "#DCDCDC",
                      borderWidth: 3
                    }}
                    source={{
                      uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
                    }}
                  />
                )}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 12.5,
                    paddingBottom: 25,
                    paddingHorizontal: 16,
                    borderBottomLeftRadius: 1,
                    borderBottomRightRadius: 1,
                    backgroundColor: "#FFF"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#000000",
                        marginRight: 10,
                        alignSelf: "flex-start"
                      }}
                    >
                      {item.first_name + " " + item.last_name}
                    </Text>
                    <TouchableOpacity style={{ marginLeft: 7 }}>
                      <FeatherIcon
                        name={"user-plus"}
                        size={20}
                        color={"gray"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  formContent: {
    flexDirection: "row",
    marginTop: 10
  },
  inputContainer: {
    borderColor: "gray",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderWidth: 2,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    margin: 5
  },
  icon: {
    width: 30,
    height: 30
  },
  iconBtnSearch: {
    alignSelf: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center"
  },
  notificationList: {
    marginTop: 10,
    padding: 10,
    marginBottom: 10,
    paddingBottom: 20
  },
  notificationBox: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 0.1
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginLeft: 10,
    alignSelf: "center"
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
    marginTop: 70,
    zIndex: 1000
  }
});

AppRegistry.registerComponent("bloodBankApp2", () => FriendsList);
