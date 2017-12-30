import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import DeckView from './DeckView'
import DeckNavigation from './ui/DeckNavigation'
import { gray, white, yellow } from '../utils/colors'
import { fetchDecks } from '../store/decks/actions'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'

class Deck extends Component {
    state = {
        ready: false,
    }

    onPress(title) {
        this.props.navigation.navigate('DeckView', {'title': title})
    }

    componentDidMount() {
        const { dispatch } = this.props
        getDecks()
            .then((data) => JSON.parse(data))
            .then((decks) => dispatch(fetchDecks(decks)))
            .then(() => this.setState(() => ({ready: true})))
    }

    mapObject(object, callback) {
        if(object===null){
            return false
        }
        return Object.keys(object).sort((a, b) => a.title - b.title).map(function (key) {
            console.log('key', key);
            return callback(key, object[key]);
        });
    }

    render() {
        const decks = this.props.decks.list
        console.log('decks', decks);
        const navigation = this.props.navigation
        const ready = this.state.ready
        const component = this
        if (ready === false) {
            return <AppLoading />
        }
        const showEmpty = (decks === null)
        return (
            <View style={styles.decksListContainer}>
                <DeckNavigation navigation={navigation} component={'Deck'}/>
                <ScrollView style={styles.deckContainer}>
                    {!showEmpty && this.mapObject(decks, function (key, deck) {
                        return <View key={key} style={styles.deck}>
                            <TouchableOpacity onPress={component.onPress.bind(component, key)}
                                              style={styles.deckTextArea}>
                                <Text
                                    style={styles.deckTitle}>{deck.title.length > 0 ? deck.title : '[No title]'}</Text>
                                <Text style={styles.deckCardsText}>{deck.questions.length} cards</Text>
                            </TouchableOpacity>
                        </View>
                    })}
                    {showEmpty && (
                        <View style={styles.deck}>
                            <View style={styles.deckTextArea}>
                                <Text style={styles.deckTitle}>No decks have been added yet</Text>
                            </View>
                        </View>
                    )}
                </ScrollView>
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
)(Deck)

const styles = StyleSheet.create({
    decksListContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    deckContainer: {
        flex: 1,
        width: '100%'
    },
    deck: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 30,
        paddingBottom: 30,
        alignItems: 'center'
    },
    deckTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    deckTextArea: {
        width: '100%',
        alignItems: 'center',
    },
    deckCardsText: {
        color: gray
    }
})