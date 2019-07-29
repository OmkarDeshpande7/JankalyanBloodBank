import React, { Component } from "react";
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
  static navigationOptions = { title: "Kunal Chadha" };
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      data: [
        {
          imageUrl: "http://via.placeholder.com/160x160",
          title: "something one"
        },
        {
          imageUrl: "http://via.placeholder.com/160x160",
          title: "something two"
        },
        {
          imageUrl: "http://via.placeholder.com/160x160",
          title: "something three"
        },
        {
          imageUrl: "http://via.placeholder.com/160x160",
          title: "something four"
        },
        {
          imageUrl: "http://via.placeholder.com/160x160",
          title: "something five"
        },
        {
          imageUrl: "http://via.placeholder.com/160x160",
          title: "something six"
        }
      ],
      dataSource: ds.cloneWithRows([
        {
          icon: "https://bootdey.com/img/Content/avatar/avatar1.png",
          description: "User 1"
        },
        {
          icon: "https://bootdey.com/img/Content/avatar/avatar2.png",
          description: "User 2"
        },
        {
          icon: "https://bootdey.com/img/Content/avatar/avatar3.png",
          description: "User 3"
        },
        {
          icon: "https://bootdey.com/img/Content/avatar/avatar4.png",
          description: "User 4"
        },
        {
          icon: "https://bootdey.com/img/Content/avatar/avatar5.png",
          description: "User 5"
        },
        {
          icon: "https://bootdey.com/img/Content/avatar/avatar6.png",
          description: "User 6"
        },
        {
          icon: "https://bootdey.com/img/Content/avatar/avatar1.png",
          description: "User 7"
        },
        {
          icon: "https://bootdey.com/img/Content/avatar/avatar2.png",
          description: "User 8"
        },
        {
          icon: "https://bootdey.com/img/Content/avatar/avatar3.png",
          description: "User 9"
        }
      ])
    };
  }

  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

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
              onChangeText={name_address => this.setState({ name_address })}
            />
          </View>
        </View>
        <Text
          style={{
            paddingLeft: 10,
            paddingTop: 15,
            paddingBottom: 7,
            fontSize: 22,
            color: "gray"
          }}
        >
          Friend Requests
        </Text>

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
          horizontal={true}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  marginVertical: 5,
                  backgroundColor: "white",
                  borderRadius: 5,
                  marginHorizontal: 10,
                  borderWidth: 0.3,
                  borderColor: "gray",
                  elevation: 0,
                  paddingHorizontal: 15
                }}
                onPress={() => {
                  alert("Add Friend");
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
                <Image
                  style={{
                    height: 120,
                    width: 120,
                    borderRadius: 60,
                    alignSelf: "center",
                    borderColor: "#DCDCDC",
                    borderWidth: 3
                  }}
                  source={{ uri: item.imageUrl }}
                />
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
                        marginHorizontal: 10,
                        alignSelf: "flex-start"
                      }}
                    >
                      {item.title}
                    </Text>
                    <FeatherIcon name={"user-plus"} size={20} color={"gray"} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <Text
          style={{
            paddingLeft: 10,
            paddingTop: 15,
            paddingBottom: 7,
            fontSize: 22,
            color: "gray"
          }}
        >
          Your Friends
        </Text>
        <ListView
          style={styles.notificationList}
          dataSource={this.state.dataSource}
          renderRow={notification => {
            return (
              <View style={styles.notificationBox}>
                <Image
                  style={styles.image}
                  source={{
                    uri: notification.icon
                  }}
                />

                <Text style={styles.name}>{notification.description}</Text>
              </View>
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
    padding: 10
  },
  notificationBox: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 10
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
