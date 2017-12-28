import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { MKTextField, MKColor, mdl} from 'react-native-material-kit'
import { Button } from 'react-native'
import { connect } from 'react-redux'
import DeckViewContainer from './DeckViewContainer'
import { addCard } from '../store/decks/actions'
import { addCardToDeck } from '../utils/api'

class AddCard extends Component {
    state = {
        question : '',
        answer : ''
    }
    onPress(){
        const { dispatch, navigation } = this.props
        const decks = this.props.decks.list
        const title = navigation.state.params.title
        addCardToDeck(title, this.state)
            .then(() => {
                if(typeof(decks[title])!=='undefined'){
                    let deck = decks[title]
                    deck.questions.push(this.state)
                    dispatch(addCard(deck))
                    navigation.goBack()
                }
            })
    }
    render() {
        const {navigation} = this.props
        const title = navigation.state.params.title
        return (
            <View>
                <View>
                    <MKTextField
                        tintColor={MKColor.Grey}
                        placeholder="Question"
                        onChangeText={(question) => this.setState({question})}
                        value={this.state.question}
                    />
                </View>
                <View>
                    <MKTextField
                        tintColor={MKColor.BlueGrey}
                        placeholder="Answer"
                        onChangeText={(answer) => this.setState({answer})}
                        value={this.state.answer}
                    />
                </View>
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
)(AddCard)