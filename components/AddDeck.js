import React, { Component } from 'react';
import { Alert, View, Text, TextInput, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Button from './Button';
import { lightGray, white } from '../utils/colors';
import { addDeck } from '../actions';

class AddDeck extends Component {
  state = {
    input: '',
  }

  handleChangeText = (text) => {
    this.setState((previousState) => ({
      ...previousState,
      input: text
    }))
  }

  handleSubmit = () => {
    const { input } = this.state;
    const { dispatch, navigation } = this.props;

    if (!input || !input.length) {
      return Alert.alert('Deck title missing', 'You need to enter a deck title.');
    }

    const deck = {
      [input]: {
        title: input,
        questions: [],
      },
    };
    dispatch(addDeck(deck));
    navigation.dispatch(NavigationActions.back());
  }

  comonentDidMount() {

  }

  render() {
    const { input } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
      >
        <Text style={styles.prompt}>What is the title</Text>
        <Text style={styles.prompt}>of your deck?</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.handleChangeText}
          placeholder='Deck title'
          value={input}
        />
        <Button
          onPress={this.handleSubmit}
        >
          Submit Deck
        </Button>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prompt: {
    fontSize: 26,
  },
  input: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginTop: 30,
    marginBottom: 15,
    alignSelf: 'stretch',
    fontSize: 20,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
})

export default connect()(AddDeck);
