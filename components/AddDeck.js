import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';

class AddDeck extends Component {
  comonentDidMount() {

  }
  render() {
    return (
      <View>
        <Text>Add Deck</Text>
      </View>
    );
  }
}

export default connect()(AddDeck);
