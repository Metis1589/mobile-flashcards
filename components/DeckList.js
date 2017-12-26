import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import DeckView from './DeckView'
import { StackNavigator } from 'react-navigation'
import { fetchDecks } from '../store/decks/actions'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'

class DeckList extends Component {
    state = {
        ready: false,
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
        let decks = this.props.decks.list
        if(typeof(decks) == 'undefined'){
            decks = {}
        }
        return (
            <View>
                {this.mapObject(decks, function (key, value) {
                    return <View key={key}>
                        <TouchableOpacity onPress={() => navigation.navigate('DeckView')}>
                            <Text>{value.title}</Text>
                            <Text>{value.questions.length} cards</Text>
                        </TouchableOpacity>
                    </View>;
                })}
            </View>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        decks: state.decks
    }
}

export default connect(
    mapStateToProps
)(DeckList)