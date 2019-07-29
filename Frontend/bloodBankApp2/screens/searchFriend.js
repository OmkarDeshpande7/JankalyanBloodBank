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
  AppRegistry
} from "react-native";

export default class FriendsList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
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
      <View style={styles.container}>
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

        <ListView
          style={styles.notificationList}
          dataSource={this.state.dataSource}
          renderRow={notification => {
            return (
              <View style={styles.notificationBox}>
                <Image
                  style={styles.image}
                  source={{ uri: notification.icon }}
                />

                <Text style={styles.name}>{notification.description}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB"
  },
  formContent: {
    flexDirection: "row",
    marginTop: 30
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    margin: 10
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
    marginTop: 20,
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
  }
});

AppRegistry.registerComponent("bloodBankApp2", () => FriendsList);
