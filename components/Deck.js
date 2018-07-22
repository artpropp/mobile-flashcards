import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;
    console.log(deck)

    return {
      title: `${deck} Deck`,
    }
  }
  componentDidMount() {

  }
  render() {
    const { deck } = this.props;

    return (
      <View>
        <Text>{JSON.stringify(deck)}</Text>
      </View>
    );
  }
}

function mapStateToProps(decks, { navigation }) {
  const { deck } = navigation.state.params;

  return {
    deck: decks[deck],
  };
}

export default connect(mapStateToProps)(Deck);
