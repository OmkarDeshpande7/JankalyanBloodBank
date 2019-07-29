import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList
} from "react-native";

export default class cardGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          title: "O POSITIVE",
          descreption: "This is group for O+ people",
          image: "https://bootdey.com/img/Content/avatar/avatar7.png"
        },
        {
          id: 2,
          title: "O NEGATIVE",
          descreption: "This is group for O- people",
          image: "https://bootdey.com/img/Content/avatar/avatar7.png"
        },
        {
          id: 3,
          title: "A POSITIVE",
          descreption: "This is group for A+ people",
          image: "https://bootdey.com/img/Content/avatar/avatar7.png"
        },
        {
          id: 4,
          title: "A NEGATIVE",
          descreption: "This is group for A- people",
          image: "https://bootdey.com/img/Content/avatar/avatar7.png"
        },
        {
          id: 5,
          title: "B POSITIVE",
          descreption: "This is group for B+ people",
          image: "https://bootdey.com/img/Content/avatar/avatar7.png"
        },
        {
          id: 6,
          title: "B NEGATIVE",
          descreption: "This is group for B- people",
          image: "https://bootdey.com/img/Content/avatar/avatar7.png"
        },
        {
          id: 7,
          title: "AB POSITIVE",
          descreption: "This is group for AB+ people",
          image: "https://bootdey.com/img/Content/avatar/avatar7.png"
        },
        {
          id: 8,
          title: "AB NEGATIVE",
          descreption: "This is group for AB- people",
          image: "https://bootdey.com/img/Content/avatar/avatar7.png"
        }
      ]
    };
  }

  clickEventListener(item) {
    Alert.alert(item.title);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor={item => {
            return item.id.toString();
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  this.clickEventListener(item);
                }}
              >
                <View style={styles.cardHeader} />
                <Image style={styles.userImage} source={{ uri: item.image }} />
                <View style={styles.cardFooter}>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text style={styles.name}>{item.title}</Text>
                    <Text style={styles.position}>{item.descreption}</Text>
                    <TouchableOpacity
                      style={styles.followButton}
                      onPress={() => this.clickEventListener(item)}
                    >
                      <Text style={styles.followButtonText}>VIEW</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
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
    marginTop: 20
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#E6E6E6"
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

    marginVertical: 5,
    backgroundColor: "white",
    flexBasis: "46%",
    marginHorizontal: 5
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
