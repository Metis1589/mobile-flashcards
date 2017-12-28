import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import DeckView from './DeckView'
import { NavigationActions } from 'react-navigation'
import { fetchDecks } from '../store/decks/actions'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { AppLoading} from 'expo'

class DeckList extends Component {
    state = {
        ready: false,
    }
    onPress(title){
        this.props.navigation.navigate('DeckView', { 'title' : title })
    }
    componentDidMount() {
        const { dispatch } = this.props
        getDecks()
            .then((decks) => {
                if(decks){
                    decks = JSON.parse(decks)
                    dispatch(fetchDecks(decks))
                }
            })
            .then(() => this.setState(() => ({ready: true})))
    }
    mapObject(object, callback) {
        return Object.keys(object).map(function (key) {
            return callback(key, object[key]);
        });
    }
    render() {
        const decks = this.props.decks.list
        const ready = this.state.ready
        const component = this
        if (ready === false) {
            return <AppLoading />
        }
        return (
            <View>
                {this.mapObject(decks, function (key, deck) {
                    return <View key={key}>
                        <TouchableOpacity onPress={component.onPress.bind(component, key)}>
                            <Text>{deck.title}</Text>
                            <Text>{deck.questions.length} cards</Text>
                        </TouchableOpacity>
                    </View>;
                })}
            </View>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        decks: state.decks,
        navigation: ownProps.navigation
    }
}

export default connect(
    mapStateToProps
)(DeckList)