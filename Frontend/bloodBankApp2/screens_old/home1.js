import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AppRegistry,
  ScrollView,
  FlatList,
  Button
} from "react-native";

import FeatherIcon from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import Drawer from "react-native-drawer";
import DrawerContent from "./DrawerContent";
import { ListItem, ButtonGroup } from "react-native-elements";

export class Profile extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      token: this.props.screenProps.token,
      name: "",
      email: "",
      phone: "",
      bg: "",
      dob: "",
      address: "",
      selectedIndex: null,
      data: []
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex: selectedIndex });
    if (selectedIndex === 0) {
      this.props.screenProps.rootNavigation.navigate("FriendsList");
    }
    if (selectedIndex === 1) {
      this.props.screenProps.rootNavigation.navigate("Notification");
    }
    if (selectedIndex === 2) {
      this.props.screenProps.rootNavigation.navigate("updateprofile");
    }
  }

  componentDidMount() {
    fetch("http://192.168.43.66:8000/profile.json", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + this.state.token
      }
    })
      .then(response => {
        obj = JSON.parse(response._bodyInit)[0];
        this.setState({
          name: obj.first_name + " " + obj.last_name,
          email: obj.email,
          phone: obj.phone,
          dob: obj.dob,
          bg: obj.bloodGroup,
          address: obj.address,
          profilePic: obj.profilePic
        });
      })
      .catch(err => {
        console.log(err);
      });

    fetch("http://192.168.43.66:8000/user-suggestion.json", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + this.state.token
      }
    })
      .then(response2 => {
        obj = JSON.parse(response2._bodyInit);
        this.setState({ data: obj });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const buttons = ["Friends", "Notifications", "Update"];
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header} />
        <Image style={styles.avatar} source={{ uri: this.state.profilePic }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.Profilename}>{this.state.name}</Text>
            <Text style={styles.info}>Blood Group: {this.state.bg}</Text>
            <Text style={styles.info}>Email: {this.state.email}</Text>
            <Text style={styles.info}>Phone Number: {this.state.phone}</Text>
            <Text style={styles.info}>Date of Birth: {this.state.dob}</Text>
            <Text style={styles.info}>Address: {this.state.address}</Text>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={this.state.selectedIndex}
              buttons={buttons}
              containerStyle={{
                flexDirection: "row",
                flex: 1,
                marginTop: 15,
                marginHorizontal: -10,
                paddingVertical: 8,
                backgroundColor: "rgba(250,250,250,0.2)"
              }}
            />

            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 20,
                marginLeft: 10,
                marginTop: 10,
                marginBottom: 3
              }}
            >
              Friend Sugesstions
            </Text>
            <FlatList
              style={styles.list}
              contentContainerStyle={styles.listContainer}
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
                      this.clickEventListener(item);
                    }}
                  >
                    <View style={styles.cardHeader} />
                    <Image
                      style={styles.userImage}
                      source={{ uri: item.profilePic }}
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
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Text style={styles.name}>
                          {item.first_name + " " + item.last_name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.screenProps.token,
      data: []
    };
  }
  componentDidMount() {
    fetch("http://192.168.43.66:8000/groups.json", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + this.state.token
      }
    })
      .then(response => {
        obj = JSON.parse(response._bodyInit);
        this.setState({ data: obj });
        
      })
      .catch(err => {
        console.log(err);
      });
  }
  clickEventListener(item) {
    alert(item.image);
  }

  render() {

    return (
      <View style={styles.container}>
        <Text
          style={{
            paddingLeft: 10,
            paddingTop: 10,
            paddingBottom: 5,
            fontSize: 22,
            color: "gray"
          }}
        >
          Your Groups
        </Text>
        {this.state.data.map((l, i) => (
          <TouchableOpacity>
            <ListItem
              key={i}
              avatar={{ source: { uri: l.image } }}
              title={l.title}
              subtitle={l.description}
            />
          </TouchableOpacity>
        ))}

        <Text
          style={{
            paddingLeft: 10,
            paddingTop: 15,
            paddingBottom: 7,
            fontSize: 22,
            color: "gray"
          }}
        >
          Other Groups
        </Text>

        {this.state.data.map((l, i) => (
          <TouchableOpacity>
            <ListItem
              key={i}
              avatar={{ source: { uri: l.image } }}
              title={l.title}
              subtitle={l.description}
              rightIcon={
                <FeatherIcon name={"user-plus"} size={20} color={"gray"} />
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

export class Feed extends Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.screenProps.token,
      data: [
        {
          id: 1,
          title: "Lorem ipsum dolor",
          time: "2018-08-01 12:15 pm",
          image: "https://lorempixel.com/400/200/nature/6/",
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean  ligula..."
        },
        {
          id: 2,
          title: "Sit amet, consectetuer",
          time: "2018-08-12 12:00 pm",
          image: null,
          description:
            "Lorem  dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula..."
        },
        {
          id: 3,
          title: "Dipiscing elit. Aenean ",
          time: "2017-08-05 12:21 pm",
          image: "https://lorempixel.com/400/200/nature/4/",
          description:
            "Lorem ipsum dolor sit , consectetuer  elit. Aenean commodo ligula..."
        },
        {
          id: 4,
          title: "Commodo ligula eget dolor.",
          time: "2015-08-12 12:00 pm",
          image: "https://lorempixel.com/400/200/nature/6/",
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula..."
        },
        {
          id: 5,
          title: "Aenean massa. Cum sociis",
          time: "2013-06-12 12:11 pm",
          image: "https://lorempixel.com/400/200/sports/1/",
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.  commodo ligula..."
        },
        {
          id: 6,
          title: "Natoque penatibus et magnis",
          time: "2018-08-12 12:56 pm",
          image: "https://lorempixel.com/400/200/nature/8/",
          description:
            "Lorem ipsum  sit amet, consectetuer adipiscing elit. Aenean commodo ligula..."
        },
        {
          id: 7,
          title: "Dis parturient montes, nascetur",
          time: "2018-08-12 12:33 pm",
          image: "https://lorempixel.com/400/200/nature/1/",
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula..."
        },
        {
          id: 8,
          title: "Ridiculus mus. Donec quam",
          time: "2018-06-12 12:44 pm",
          image: "https://lorempixel.com/400/200/nature/3/",
          description:
            "Lorem ipsum  sit amet, consectetuer adipiscing elit.  commodo ligula..."
        },
        {
          id: 9,
          title: "Felis, ultricies nec, pellentesque",
          time: "2012-07-12 12:23 pm",
          image: "https://lorempixel.com/400/200/nature/4/",
          description:
            "Lorem ipsum dolor sit amet, consectetuer  elit. Aenean commodo ligula..."
        }
      ]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.state.data}
          keyExtractor={item => {
            return item.id.toString();
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={post => {
            const item = post.item;
            if (item.image != null) {
              image = (
                <Image style={styles.cardImage} source={{ uri: item.image }} />
              );
            } else {
              image = null;
            }
            return (
              <View style={styles.card}>
                {image}
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <View style={styles.timeContainer}>
                      <Image
                        style={styles.iconData}
                        source={{
                          uri:
                            "https://png.icons8.com/color/96/3498db/calendar.png"
                        }}
                      />
                      <Text style={styles.time}>{item.time}</Text>
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
                              "https://png.icons8.com/material/96/2ecc71/visible.png"
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
    );
  }
}

var self;

export default class Home extends Component {
  constructor(props) {
    super(props);
    self = this.openControlPanel;
  }

  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };

  componentDidMount() {
    this.props.navigation.setParams({
      openDrawer: this.openControlPanel
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Janakalyan Blood Bank",
      headerLeft: (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.getParam("openDrawer")}
        >
          <Entypo name="menu" size={25} color={"white"} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={navigation.getParam("openDrawer")}
        >
          <FeatherIcon name="search" size={25} color={"white"} />
        </TouchableOpacity>
      ),
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

  render() {
    return (
      <Drawer
        ref={ref => (this._drawer = ref)}
        content={<DrawerContent />}
        type="displace"
        tapToClose={true}
        openDrawerOffset={0.15}
        panCloseMask={
          0.15 // 20% gap on the right side of drawer
        }
        closedDrawerOffset={-3}
        styles={this.drawerStyles}
        tweenHandler={ratio => ({
          main: { opacity: (2 - ratio) / 2 }
        })}
      >
        <View style={styles.container}>
          <Tabs
            screenProps={{
              rootNavigation: this.props.navigation,
              token: this.props.navigation.getParam("token")
            }}
          />
        </View>
      </Drawer>
    );
  }
}

const Tabs = createAppContainer(
  createBottomTabNavigator(
    {
      Feed: {
        screen: Feed,
        navigationOptions: {
          tabBarLabel: null,
          tabBarIcon: ({ tintColor }) => (
            <FeatherIcon name="home" size={25} color={tintColor} />
          )
        }
      },
      Groups: {
        screen: Groups,
        navigationOptions: {
          tabBarLabel: null,
          tabBarIcon: ({ tintColor }) => (
            <Entypo name="chat" size={25} color={tintColor} />
          )
        }
      },
      Post: {
        screen: Groups,
        navigationOptions: {
          tabBarLabel: null,
          tabBarIcon: ({ tintColor }) => (
            <Entypo name="squared-plus" size={25} color={tintColor} />
          )
        }
      },
      Notifications: {
        screen: Groups,
        navigationOptions: {
          tabBarLabel: null,
          tabBarIcon: ({ tintColor }) => (
            <EvilIcons name="bell" size={25} color={tintColor} />
          )
        }
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          tabBarLabel: null,
          tabBarIcon: ({ tintColor }) => (
            <Entypo name="user" size={25} color={tintColor} />
          )
        }
      }
    },
    {
      tabBarOptions: {
        activeTintColor: "#222",
        inactiveTintColor: "gray",
        style: {},
        showLabel: false,
        activeBackgroundColor: "#ddd"
      }
    }
  )
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#660000",
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
    marginTop: 70,
    zIndex: 1000
  },
  Profilename: {
    fontSize: 32,
    color: "#000",
    fontWeight: "bold",
    paddingTop: 20,
    paddingBottom: 2,
    alignSelf: "center"
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 30
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 5
  },
  description: {
    fontSize: 18,
    color: "#696969",
    textAlign: "center",
    marginLeft: 10,
    marginVertical: 20
  },
  viewDesc: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    marginTop: 10,
    textAlign: "center"
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
    paddingHorizontal: 0,
    backgroundColor: "#fff",
    paddingTop: 5
  },
  separator: {
    marginTop: 5
  },
  /******** card **************/
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 0,
    backgroundColor: "white"
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
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 2,
    backgroundColor: "white",
    flexBasis: "46%",
    marginHorizontal: 1
  },
  cardFooter: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  cardContent: {
    paddingVertical: 12.5,
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

const drawerStyles = {
  drawer: { shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 }
};

AppRegistry.registerComponent("bloodBankApp2", () => Home);
