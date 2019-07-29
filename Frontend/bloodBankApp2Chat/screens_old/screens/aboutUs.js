import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  AppRegistry,
  ImageBackground
} from "react-native";

export default class AboutUs extends Component {
  static navigationOptions = {
    title: "About Us"
  };

  constructor(props) {
    super(props);
  }

  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed ");
  };

  render() {
    return (
      <ImageBackground
        source={require("../bg3.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={{
                uri: "https://png.icons8.com/facebook-like/nolan/120/3498db"
              }}
            />
            <Text style={styles.companyName}>Janakalayan Blood Bank</Text>
            <Text style={styles.slogan}>We create awesome apps!</Text>
            <View style={styles.descriptionContent}>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, altera conceptam ei cum. Hinc
                temporibus repudiandae eu mel, cum impetus legendos ei. Fugit
                everti dissentias duo cu, nihil fabellas id pri, nonumy verear
                ea pri. Sit et nisl eros. Ad sapientem forensibus est, ne vis
                sonet iuvaret, his sint fabulas dolores ad. Repudiare gubergren
                voluptatum ius ne, nec nostro possim nostrud ad,
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)"
  },
  logo: {
    width: 120,
    height: 120,
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 30
  },
  companyName: {
    fontSize: 32,
    fontWeight: "600",
    color: "#FFFFFF"
  },
  slogan: {
    fontSize: 18,
    fontWeight: "600",
    color: "#228B22",
    marginTop: 10
  },
  descriptionContent: {
    padding: 30
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    color: "#FFFFFF"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 100,
    borderRadius: 30
  },
  sendButton: {
    backgroundColor: "#FFFFFF"
  },
  buttonText: {
    color: "#EE82EE"
  }
});

AppRegistry.registerComponent("bloodBankApp2", () => AboutUs);
