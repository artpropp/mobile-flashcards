import React, { Component } from 'react';
import { Alert, Text, TextInput, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
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
        behavior='height'
      >
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
        <Button
          onPress={this.handleSubmit}
        >
          Submit Card
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

export default connect()(AddCard);
