import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Button } from 'react-native'
import { connect } from 'react-redux'
import { gray, white, black } from '../utils/colors'
import { AppLoading } from 'expo'

class DeckView extends Component {
    onPressNavigate(component){
        const { navigation } = this.props
        const title = this.props.navigation.state.params.title
        navigation.navigate(component, { 'title' : title })
    }
    render() {
        let title = this.props.navigation.state.params.title
        const decks = this.props.decks.list
        if(decks===null){
            return <AppLoading />
        }
        if(typeof(decks[title])==='undefined'){
            return <AppLoading />
        }
        const deck = decks[title]
        return (
            <View style={styles.container}>
                <View style={styles.deckTitleContainer}>
                    <Text style={styles.deckTitle}>{deck.title}</Text>
                </View>
                <View style={styles.deckCardsTextContainer}>
                    <Text style={styles.deckCardsText}>{deck.questions.length} cards</Text>
                </View>
                <View style={styles.deckButtonAddCard}>
                    <Button
                        onPress={this.onPressNavigate.bind(this, 'AddCard')}
                        title="Add card"
                        color={black}
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                <View style={styles.deckButtonStartQuiz}>
                    <Button
                        onPress={this.onPressNavigate.bind(this, 'Quiz')}
                        title="Start quiz"
                        color={white}
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
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
)(DeckView)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 70,
    },
    deckTitleContainer: {
        width: '100%',
        marginBottom: 15,
    },
    deckTitle: {
        fontSize: 36,
        textAlign: 'center'
    },
    deckCardsTextContainer: {
        marginBottom: 70
    },
    deckCardsText: {
        fontSize: 20,
        color: gray
    },
    deckButtonAddCard: {
        backgroundColor: white,
        borderWidth: 1,
        borderColor: black,
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
        width: '50%',
        marginBottom: 10
    },
    deckButtonStartQuiz: {
        backgroundColor: black,
        borderWidth: 1,
        borderColor: black,
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
        width: '50%'
    }
});