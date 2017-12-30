import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Button } from 'react-native'
import { MKTextField, MKColor, mdl} from 'react-native-material-kit'
import { createDeck } from '../store/decks/actions'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import DeckNavigation from './ui/DeckNavigation'
import ErrorModal from './ui/ErrorModal'
import { white, black } from '../utils/colors'

class NewDeck extends Component {
    state = {
        title: '',
        visibleModal: false,
        errorMessage: ''
    }

    onPress() {
        const { dispatch, navigation } = this.props
        const title = this.state.title
        if (title.length > 0) {
            const decks = this.props.decks.list
            if (decks!==null && typeof(decks[title]) !== 'undefined') {
                this.setState({visibleModal: true, errorMessage: 'Deck already exists'})
            }
            else {
                saveDeckTitle(title)
                    .then(() => {
                        deck = {
                            title: title,
                            questions: []
                        }
                        dispatch(createDeck(deck))
                        this.setState({title: ''})
                        navigation.navigate('DeckView', {'title': title, showError: false})
                    })
            }
        }
        else {
            this.setState({visibleModal: true, errorMessage: 'Deck title can\'t be empty'})
        }
    }

    render() {
        const navigation = this.props.navigation
        const { errorMessage, visibleModal } = this.state
        return (
            <View style={styles.container}>
                <DeckNavigation navigation={navigation} component={'NewDeck'}/>
                <ErrorModal
                    visibleModal={ visibleModal }
                    errorMessage={ errorMessage }
                    onCloseClick={() => this.setState({ visibleModal: false, errorMessage : '' })}
                />
                <View style={styles.formContainer}>
                    <View style={styles.formContainerTitleBox}>
                        <Text style={styles.formContainerTitle}>What is title of your new deck?</Text>
                    </View>
                    <View style={styles.formContainerInputBox}>
                        <MKTextField
                            style={styles.formContainerInput}
                            tintColor={MKColor.Grey}
                            placeholder="Deck Title"
                            onChangeText={(title) => this.setState({title})}
                            value={this.state.title}
                        />
                    </View>
                    <View style={styles.formContainerButton}>
                        <Button
                            onPress={this.onPress.bind(this)}
                            title="Submit"
                            color="#fff"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
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
)(NewDeck)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
    },
    formContainer: {
        flex: 1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%'
    },
    formContainerTitleBox: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 30,
    },
    formContainerTitle: {
        fontSize: 40,
        textAlign: 'center'
    },
    formContainerInputBox: {
        width: '100%',
        borderWidth: 1,
        borderColor: black,
        borderRadius: 5,
        paddingLeft: 3,
        paddingRight: 3,
        marginBottom: 30
    },
    formContainerInput: {
        marginTop: 8,
        marginBottom: 5
    },
    formContainerButton: {
        backgroundColor: black,
        borderWidth: 1,
        borderColor: black,
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15
    }
})