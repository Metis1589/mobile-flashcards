import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import DeckList from './DeckList'

export default class DeckView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>Deck View</Text>
                </View>
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