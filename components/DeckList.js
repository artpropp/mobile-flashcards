import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchDecks } from '../utils/api';
import { white, gray, cyan, lightCyan, lightGray } from '../utils/colors';
import { receiveDecks } from '../actions';
import { AppLoading } from 'expo';
import Button from './Button';
import { Feather } from '@expo/vector-icons';

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
    const { decks, navigation } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return (
        <AppLoading />
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'stretch'}}>
          <View style={styles.deckList}>
            {Object.keys(decks).map((deck) => {
              const { title, questions } = decks[deck];

              return (
                <TouchableOpacity
                  key={deck}
                  onPress={() => navigation.navigate('Deck', { deck })}
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
        </ScrollView>
        <View style={styles.buttonBar}>
          {Platform.OS === 'ios'
            ? <Button onPress={() => navigation.navigate('AddDeck')}>
                Add Deck
              </Button>
            : <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddDeck')}>
                <Feather
                  name='plus'
                  color={white}
                  size={40}
                />
              </TouchableOpacity>}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    paddingTop: 20,
    backgroundColor: lightGray,
    alignItems: 'stretch',
  },
  deckList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingRight: Platform.OS === 'ios' ? 20 : 10,
    paddingLeft: Platform.OS === 'ios' ? 20 : 10,
    paddingBottom: Platform.OS === 'ios' ? 80 : 20,
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
  buttonBar: {
    padding: 20,
    paddingBottom: 20,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.34)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    backgroundColor: 'transparent',
  },
  button: {
    elevation: 5,
    padding: 0,
    margin: 0,
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: cyan,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);
