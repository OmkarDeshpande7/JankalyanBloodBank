import React from "react";
import { AppRegistry, StyleSheet, Text, View, Button } from "react-native";

export default class Splash extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    setTimeout(() => {
      /*if (firebase.auth().currentUser) {
        this.props.navigation.navigate("Home");
      } else {
        this.props.navigation.navigate("SignIn");
      }*/
      this.props.navigation.navigate("login");
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
