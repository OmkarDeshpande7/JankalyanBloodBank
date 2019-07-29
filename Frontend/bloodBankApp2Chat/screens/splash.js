import React from "react";
import { ip } from "./host.js";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage
} from "react-native";
import { SecureStore } from "expo";

export default class Splash extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    setTimeout(() => {
      /*SecureStore.setItemAsync("test1", "value1").then(response => {
        console.log("saved");
      });
      
      SecureStore.deleteItemAsync("test1").then(response => {
        
      });

      */

      let isLoggedIn = "false";
      SecureStore.getItemAsync("isLoggedIn").then(response => {
        isLoggedIn = response;
        if (isLoggedIn === "true") {
          SecureStore.getItemAsync("token").then(response => {
            this.props.navigation.replace("Home", {
              token: response
            });
          });
        } else {
          this.props.navigation.replace("login");
        }
      });
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            color: "#fff"
          }}
        >
          Janakalyan
        </Text>
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            color: "#fff"
          }}
        >
          Blood Bank
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#660000"
  }
});

AppRegistry.registerComponent("bloodBankApp2", () => SplashScreen);
