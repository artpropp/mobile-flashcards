import React, { Component } from 'react';
import { Alert, View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { gray, lightGray, white } from '../utils/colors';
import Button from './Button';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params;

    return {
      title: `${deck} Deck`,
    }
  }

  handleStartQuiz = () => {
    const { deck, navigation } = this.props;

    if (deck.questions.length === 0) {
      return Alert.alert('No cards in deck', 'You need to add at least one card to deck');
    }

    navigation.navigate('Quiz', { deck: deck.title });
  }

  render() {
    const { deck, navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.deck}>
          <Text style={styles.deckTitle}>
            {deck.title}
          </Text>
          <Text style={styles.deckDescription}>
            {deck.questions.length} cards
          </Text>
        </View>
        <Button style={styles.button} onPress={() => navigation.navigate('AddCard', { deck: deck.title })}>
          Add Card
        </Button>
        <Button style={styles.button} onPress={this.handleStartQuiz}>
          Start Quiz
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: lightGray,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  deck: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginTop: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  deckTitle: {
    fontSize: 24,
    paddingTop: 10,
    paddingBottom: 10,
  },
  deckDescription: {
    fontSize: 16,
    color: gray,
    paddingBottom: 15,
  },
  button: {
    alignSelf: 'stretch',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
  }
});

function mapStateToProps(decks, { navigation }) {
  const { deck } = navigation.state.params;

  return {
    deck: decks[deck],
  };
}

export default connect(mapStateToProps)(Deck);
