import React, { Component } from 'react';
import { Alert, View, Text, TextInput, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Button from './Button';
import { lightGray, white } from '../utils/colors';
import { addCard } from '../actions';
import { submitCard } from '../utils/api';

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;

    return {
      title: `Add Card to ${deck}`,
    }
  }

  state = {
    question: '',
    answer: '',
  }

  handleChangeQuestion = (text) => {
    this.setState((previousState) => ({
      ...previousState,
      question: text
    }))
  }
  handleChangeAnswer = (text) => {
    this.setState((previousState) => ({
      ...previousState,
      answer: text
    }))
  }

  handleSubmit = () => {
    const { question, answer } = this.state;
    const { dispatch, navigation } = this.props;
    const { deck } = navigation.state.params;

    if (!question || !question.length) {
      return Alert.alert('Question empty', 'You need to enter a qustion.');
    }

    if (!answer || !answer.length) {
      return Alert.alert('Answer empty', 'You need to enter an answer.');
    }

    const card = {
      question,
      answer,
    };

    dispatch(addCard(deck, card));
    navigation.dispatch(NavigationActions.back());
    submitCard(deck, card);
  }

  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 80 }
      >
        <View style={styles.promptContainer}>
          <Text style={styles.prompt}>Question</Text>
          <TextInput
            style={styles.input}
            onChangeText={this.handleChangeQuestion}
            placeholder='Question'
            value={question}
          />
          <Text style={styles.prompt}>Answer</Text>
          <TextInput
            style={styles.input}
            onChangeText={this.handleChangeAnswer}
            placeholder='Answer'
            value={answer}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this.handleSubmit}>
            Submit
          </Button>
        </View>
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
    justifyContent: 'space-between',
  },
  promptContainer: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  prompt: {
    marginTop: 20,
    fontSize: 22,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: Platform.OS === 'ios' ? 'center' : 'flex-end',
    marginBottom: 20,
  },
})

export default connect()(AddCard);
