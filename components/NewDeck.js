import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import NewDeckContainer from './NewDeckContainer'

export default class NewDeck extends Component {
  render() {
    return (
        <View style={styles.container}>
          <View>
            <Text>New deck</Text>
          </View>
          <NewDeckContainer navigation={this.props.navigation} />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});