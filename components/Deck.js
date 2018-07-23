import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { lightGray } from '../utils/colors';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: lightGray,
  },
})

function mapStateToProps(decks, { navigation }) {
  const { deck } = navigation.state.params;

  return {
    deck: decks[deck],
  };
}

export default connect(mapStateToProps)(Deck);
