import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native'

class DeckViewContainer extends Component {
    onPressAddCard(){
        const {title, navigation} = this.props
        navigation.navigate('AddCard', { 'title' : title })
    }
    onPressStartQuiz(){
        const {title, navigation} = this.props
        navigation.navigate('Quiz', { 'title' : title })
    }
    render() {
        const {title, navigation} = this.props
        const decks = this.props.decks.list
        if(typeof(decks[title])==='undefined'){
            return <View>
                <Text>Not found</Text>
            </View>
        }
        const deck = decks[title]
        return (
            <View>
                <Text>{deck.title}</Text>
                <Text>{deck.questions.length} cards</Text>
                <Button
                    onPress={this.onPressAddCard.bind(this)}
                    title="Add card"
                    color="#000"
                    accessibilityLabel="Learn more about this purple button"
                />
                <Button
                    onPress={this.onPressStartQuiz.bind(this)}
                    title="Quiz"
                    color="#000"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        title: ownProps.title,
        decks: state.decks,
        navigation: ownProps.navigation
    }
}

export default connect(
    mapStateToProps
)(DeckViewContainer)

