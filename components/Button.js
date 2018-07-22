import React from 'react';
import { TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import { cyan, white } from '../utils/colors';

export default function Button({ children, onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosButton : styles.androidButton }
      onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

styles = StyleSheet.create({
  iosButton: {
    backgroundColor: cyan,
    padding: 10,
    borderRadius: 7,
    marginLeft: 60,
    marginRight: 60,
  },
  androidButton: {
    backgroundColor: cyan,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 30,
  }
});
