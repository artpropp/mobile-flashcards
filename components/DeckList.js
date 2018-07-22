import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchDecks } from '../utils/api';
import { white, gray, lightCyan, lightGray } from '../utils/colors';
import { receiveDecks } from '../actions';
import { AppLoading } from 'expo';
import Button from './Button';

class DeckList extends Component {
  state = {
    ready: false,
  };
  componentDidMount() {
    const { dispatch } = this.props;

    fetchDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => {
        this.setState(() => ({ ready: true }))
      });
  }
  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return (
        <AppLoading />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.deckList}>
          {Object.keys(decks).map((deck) => {
            const { title, questions } = decks[deck];

            return (
              <TouchableOpacity
                key={deck}
                onPress={() => this.props.navigation.navigate('Deck', { deck })}
                style={styles.deck}>
                <Text style={styles.deckTitle}>
                  {title}
                </Text>
                <Text style={styles.deckDescription}>
                  {questions.length} cards
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
      <Button onPress={() => this.props.navigation.navigate('AddDeck')}>Add Deck</Button>
    </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: lightGray,
  },
  deckList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  deck: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginTop: 15,
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
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);
