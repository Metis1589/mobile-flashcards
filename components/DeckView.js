import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import DeckViewContainer from './DeckViewContainer'

export default class DeckView extends Component {
    render() {
        const {navigation} = this.props
        const title = navigation.state.params.title
        return (
            <View>
                <DeckViewContainer title={title} navigation={navigation} />
            </View>
        )
    }
}