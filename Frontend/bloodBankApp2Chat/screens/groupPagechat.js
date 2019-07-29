import React, { Component } from "react";
import { ip } from "./host.js";
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
  Button,
  Platform,
  RefreshControl
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { GiftedChat } from 'react-native-gifted-chat';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class GroupPageChat extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }


  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
  

  render() {
    return (
      <View style={{flex: 1}}>
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      {Platform.OS === 'android' ? <KeyboardSpacer topSpacing={35}/> : null }
      </View>
    )
  }
}


AppRegistry.registerComponent("bloodBankApp2", () => GroupPageChat);
