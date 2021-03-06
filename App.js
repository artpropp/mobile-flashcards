import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import reducer from './reducers';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import AddCard from './components/AddCard';
import AddDeck from './components/AddDeck';
import Quiz from './components/Quiz';
import { setLocalNotification } from './utils/helpers';

const MainNavigator = createStackNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      header: null,
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: 'Add Deck',
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {

    }
  },
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
