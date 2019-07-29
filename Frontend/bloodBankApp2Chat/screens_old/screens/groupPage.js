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
  TextInput,
  Button
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";

export default class GroupPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginHorizontal: 10,
            alignItems: "center"
          }}
        >
          <Image
            style={styles.avatar}
            source={{
              uri: "http://192.168.43.66:8000" + navigation.getParam("obj").image
            }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            {navigation.getParam("obj").title}
          </Text>
        </View>
      ),

      headerStyle: {
        backgroundColor: "#660000"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#fff"
      },
      headerRight: (
        <TouchableOpacity
          style={{ width: 40, paddingLeft: 10 }}
          onPress={() => {
            navigation.navigate("GroupDescriptionPage", {
              obj: navigation.getParam("obj")
            });
          }}
        >
          <Icon name="arrow-right" size={20} color={"white"} />
        </TouchableOpacity>
      )
    };
  };
  state = {
    token: "",
    GroupName: "",
    data: [],
    data1: []
  };

  constructor(props) {
    super(props);
    let obj = this.props.navigation.getParam("obj");
    this.state = {
      token: this.props.navigation.getParam("token")
    };
  }

  componentDidMount() {
    let obj = this.props.navigation.getParam("obj");
    fetch("http://192.168.43.66:8000/getGroupPost/" + obj.id + "/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + this.state.token
      }
    })
      .then(response => {
        object = JSON.parse(response._bodyInit);
        this.setState({
          data: object["groupPosts"],
          data1: object["formPosts"]
        });
        console.log(object);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let obj = this.props.navigation.getParam("obj");
    return (
      <ImageBackground
        source={require("../bg3.jpg")}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <View style={{ flex: 1, flexDirection: "column" }}>
          <ScrollView style={{ flex: 1 }}>
            <FlatList
              style={[
                styles.list,
                {
                  backgroundColor: "rgba(0,0,0,0);"
                }
              ]}
              data={this.state.data1}
              keyExtractor={item => {
                item.group[0].id;
              }}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
              renderItem={post => {
                const item = post.item;

                return (
                  <View style={styles.card}>
                    <View style={styles.cardHeader}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.title}>{item.postDetails}</Text>
                        <TextInput
                          style={{ marginVertical: 10 }}
                          placeholder="Enter your Response ..."
                          autoCapitalize="none"
                          underlineColorAndroid="transparent"
                          onChangeText={t => this.setState({ time: t })}
                        />
                        <Button
                          title="Submit Response"
                          style={{ color: "#00f", marginBottom: 10 }}
                          onPress={() => {
                            this.formData.append("time", this.state.time);
                            this.formData.append("id", item.id);
                            fetch("http://192.168.43.66:8000/send-response/", {
                              method: "post",
                              headers: {
                                "Content-Type": "multipart/form-data",
                                Accept: "application/json",
                                Authorization: "Token " + this.state.token
                              },
                              body: this.formData,

                              credentials: "include"
                            })
                              .then(response => {
                                if (response.status === 201) {
                                  alert(
                                    "We have received your response! Thank You!"
                                  );
                                } else {
                                  alert("Please Try Again!");
                                }
                              })
                              .catch(err => {
                                alert(err);
                              });
                          }}
                        />
                        <View style={styles.timeContainer}>
                          <Image
                            style={styles.iconData}
                            source={{
                              uri:
                                "https://png.icons8.com/color/96/3498db/calendar.png"
                            }}
                          />

                          <Text style={styles.time}>
                            {item.timestamp.toString().substring(0, 10)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            />

            <FlatList
              style={[
                styles.list,
                {
                  backgroundColor: "rgba(0,0,0,0);"
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
                      style={[
                        styles.cardImage,
                        {
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5
                        }
                      ]}
                      source={{
                        uri: "http://192.168.43.66:8000" + item.image
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
                        <Text style={styles.title}>{item.postDetails}</Text>
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
                  </View>
                );
              }}
            />
          </ScrollView>
          <TouchableOpacity
            style={[
              styles.buttonContainer,
              {
                backgroundColor: "#00b5ec",

                shadowColor: "#808080",
                shadowOffset: {
                  width: 0,
                  height: 9
                },
                shadowOpacity: 0.5,
                shadowRadius: 12.35,

                elevation: 19,
                alignSelf: "center",
                justifySelf: "flex-end"
              }
            ]}
          >
            <Text style={{ color: "white" }}>Post In Group</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#660000",
    flexDirection: "row",
    paddingVertical: 5
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "white",
    marginHorizontal: 14
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
  container: {
    flex: 1
  },
  list: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    paddingTop: 5
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
    justifyContent: "center",
    flexDirection: "row",
    flex: 1
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: "flex-end",
    justifyContent: "center"
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

AppRegistry.registerComponent("bloodBankApp2", () => GroupPage);
