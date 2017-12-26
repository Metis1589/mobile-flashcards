import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { createDeck } from '../store/decks/actions'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import { MKTextField, MKColor, mdl} from 'react-native-material-kit'
import { Button } from 'react-native'
import { NavigationActions } from 'react-navigation'

class NewDeckContainer extends Component {
    state = {
        title: ''
    }
    onPress(){
        const { dispatch, navigation } = this.props
        saveDeckTitle(this.state.title)
            .then(() => {
                deck = {
                    title : this.state.title,
                    questions : []
                }
                dispatch(createDeck(deck))
                navigation.dispatch(NavigationActions.back({key: 'NewDeck'}))
            })
    }
    render() {
        const decks = this.props.decks.list
        return (
            <View>
                <Text>What is title of your new deck?</Text>
                <MKTextField
                    tintColor={MKColor.Grey}
                    placeholder="Deck Title"
                    onChangeText={(title) => this.setState({title})}
                    value={this.state.title}
                />
                <Button
                    onPress={this.onPress.bind(this)}
                    title="Submit"
                    color="#000"
                    accessibilityLabel="Learn more about this purple button"
                />
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
)(NewDeckContainer)
