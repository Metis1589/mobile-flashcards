import React, { Component } from 'react'
import { StyleSheet, View, Text, Button, ActivityIndicator } from 'react-native'
import { MKTextField, MKColor, mdl} from 'react-native-material-kit'
import ErrorModal from './ui/ErrorModal'
import { connect } from 'react-redux'
import { addCard } from '../store/decks/actions'
import { addCardToDeck } from '../utils/api'
import { white, black } from '../utils/colors'


class AddCard extends Component {
    state = {
        question: '',
        answer: '',
        visibleModal: false
    }

    onPress() {
        const { dispatch, navigation } = this.props
        const title = this.props.navigation.state.params.title
        const decks = this.props.decks.list
        if (typeof(decks[title]) === 'undefined') {
            return <View>
                <Text>Not found</Text>
            </View>
        }
        const card = {
            question: this.state.question,
            answer: this.state.answer
        }
        if (this.state.question.length > 0 && this.state.answer.length > 0) {
            let deck = decks[title]
            addCardToDeck(title, this.state)
                .then(() => {
                    deck.questions.push(this.state)
                    dispatch(addCard(deck))
                    navigation.goBack()
                })
        }
        else {
            this.setState({visibleModal: true})
        }
    }

    render() {
        const { visibleModal } = this.state
        return (
            <View style={styles.container}>
                <ErrorModal
                    visibleModal={ visibleModal }
                    errorMessage={ 'Answer and question can\'t be empty' }
                    onCloseClick={() => this.setState({ visibleModal: false })}
                />
                <View style={styles.formContainer}>
                    <View style={styles.formContainerInputBox}>
                        <MKTextField
                            style={styles.formContainerInput}
                            tintColor={MKColor.Grey}
                            placeholder="Type your question"
                            onChangeText={(question) => this.setState({question})}
                            value={this.state.question}
                        />
                    </View>
                    <View style={styles.formContainerInputBox}>
                        <MKTextField
                            style={styles.formContainerInput}
                            tintColor={MKColor.BlueGrey}
                            placeholder="Type answer for question"
                            onChangeText={(answer) => this.setState({answer})}
                            value={this.state.answer}
                        />
                    </View>
                    <View style={styles.formContainerButton}>
                        <Button
                            style={styles.formContainerInput}
                            onPress={this.onPress.bind(this)}
                            title="Submit"
                            color={white}
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
)(AddCard)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 70,
    },
    formContainer: {
        width: '95%',
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainerInputBox: {
        width: '100%',
        borderWidth: 1,
        borderColor: black,
        borderRadius: 5,
        paddingLeft: 3,
        paddingRight: 3,
        marginBottom: 35
    },
    formContainerInput: {
        marginTop: 8,
        marginBottom: 5
    },
    formContainerButton: {
        alignItems: 'center',
        width: '50%',
        backgroundColor: black,
        borderWidth: 1,
        borderColor: black,
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
    }
})