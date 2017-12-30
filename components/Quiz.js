import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Button } from 'react-native'
import { MKTextField, MKColor, mdl} from 'react-native-material-kit'
import ErrorModal from './ui/ErrorModal'
import { getDailyReminderValue, clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { connect } from 'react-redux'
import { white, black, red, redDark, green } from '../utils/colors'

class Quiz extends Component {
    state = {
        answer: '',
        showAnswer: false,
        questionIndex: 0,
        correctAnswersCount: 0,
        visibleModal: false
    }

    onCorrectButtonPress(card) {
        if (this.state.answer.length > 0) {
            const {questionIndex} = this.state
            let {correctAnswersCount} = this.state
            if (card.answer === this.state.answer) {
                correctAnswersCount++
            }
            this.setState({questionIndex: (questionIndex + 1), answer: '', correctAnswersCount: correctAnswersCount})
        }
        else {
            this.setState({visibleModal: true})
        }
    }

    onInCorrectButtonPress() {
        const {questionIndex} = this.state
        this.setState({questionIndex: (questionIndex + 1), answer: ''})
    }

    render() {
        const {navigation} = this.props
        const title = navigation.state.params.title
        const decks = this.props.decks.list
        if (typeof(decks[title]) === 'undefined') {
            return <View>
                <Text>Not found</Text>
            </View>
        }
        const deck = decks[title]
        const {questionIndex, showAnswer, correctAnswersCount} = this.state
        if (questionIndex === deck.questions.length) {
            clearLocalNotification()
                .then(setLocalNotification)
            return <View style={styles.resultContainer}>
                <View style={styles.resultContainerTitleContainer}>
                    <Text style={styles.resultContainerTitle}>Congratulations! You have finished quiz</Text>
                    <Text style={styles.resultContainerResult}>You have correctly answered</Text>
                    <Text style={styles.resultContainerResult}>on {correctAnswersCount} of {deck.questions.length}
                        questions</Text>
                </View>
                <View style={styles.resultButtonTakeAgain}>
                    <Button
                        onPress={() => this.setState({questionIndex : 0, correctAnswersCount : 0})}
                        title="Restart quiz"
                        color={black}
                    />
                </View>
                <View style={styles.resultButtonBackToDecks}>
                    <Button
                        onPress={() => navigation.goBack() }
                        title="Back to deck"
                        color={white}
                    />
                </View>
            </View>
        }
        const card = deck['questions'][questionIndex]
        const { visibleModal } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.questionNumbersContainer}>
                    <Text style={styles.questionNumbersText}>{(questionIndex + 1)}/{deck.questions.length}</Text>
                </View>
                <ErrorModal
                    visibleModal={ visibleModal }
                    errorMessage={ 'Answer can\'t be empty' }
                    onCloseClick={() => this.setState({ visibleModal: false })}
                />
                <View style={styles.questionAnswerContainer}>
                    {!showAnswer && (
                        <View>
                            <View style={styles.questionContainerTitleBox}>
                                <Text style={styles.questionContainerTitle}>{card.question}</Text>
                            </View>
                            <Button
                                onPress={() => this.setState({showAnswer : true})}
                                title="Answer"
                                color={redDark}
                            />
                            <View style={styles.questionInputContainer}>
                                <MKTextField
                                    style={styles.questionInput}
                                    tintColor={MKColor.Blue}
                                    placeholder="Type your answer"
                                    onChangeText={(answer) => this.setState({answer})}
                                    value={this.state.answer}
                                />
                            </View>
                            <View style={styles.questionButtonCorrect}>
                                <Button
                                    onPress={this.onCorrectButtonPress.bind(this, card)}
                                    title="Correct"
                                    color={white}
                                />
                            </View>
                            <View style={styles.questionButtonIncorrect}>
                                <Button
                                    onPress={this.onInCorrectButtonPress.bind(this)}
                                    title="Incorrect"
                                    color={white}
                                />
                            </View>
                        </View>
                    )}
                    {showAnswer && (
                        <View>
                            <View style={styles.questionContainerTitleBox}>
                                <Text style={styles.questionContainerTitle}>{card.answer}</Text>
                            </View>
                            <Button
                                onPress={() => this.setState({showAnswer : false})}
                                title="Question"
                                color={redDark}
                            />
                        </View>
                    )}
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
)(Quiz)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: white,
        justifyContent: 'flex-start',
        alignContent: 'center',
        paddingBottom: 70,
    },
    questionNumbersContainer: {
        margin: 5,
        height: 30,
        justifyContent: 'flex-start',
        alignContent: 'center'
    },
    questionNumbersText: {
        textAlign: 'left',
        fontSize: 16
    },
    questionAnswerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    questionContainerTitleBox: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 0,
    },
    questionContainerTitle: {
        fontSize: 40,
        textAlign: 'center'
    },
    questionInputContainer: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        paddingLeft: 3,
        paddingRight: 3,
        width: '80%',
        marginLeft: '10%',
        marginTop: 30,
        marginBottom: 30,
    },
    questionInput: {
        marginTop: 8,
        marginBottom: 5
    },
    questionButtonCorrect: {
        backgroundColor: green,
        borderWidth: 1,
        borderColor: green,
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
        width: '50%',
        marginLeft: '25%',
        marginBottom: 10
    },
    questionButtonIncorrect: {
        backgroundColor: red,
        borderWidth: 1,
        borderColor: red,
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
        width: '50%',
        marginLeft: '25%'
    },
    resultContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: white,
        justifyContent: 'center',
        alignContent: 'center',
        paddingBottom: 70,
    },
    resultContainerTitleContainer: {
        alignItems: 'center',
        width: '80%',
        marginLeft: '12%',
        marginBottom: 30,
    },
    resultContainerTitle: {
        fontSize: 36,
        textAlign: 'center',
        marginBottom: 20,
    },
    resultContainerResult: {
        fontSize: 20,
        textAlign: 'center'
    },
    resultButtonTakeAgain: {
        backgroundColor: white,
        borderWidth: 1,
        borderColor: black,
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
        width: '50%',
        marginLeft: '25%',
        marginBottom: 10
    },
    resultButtonBackToDecks: {
        backgroundColor: black,
        borderWidth: 1,
        borderColor: black,
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 15,
        width: '50%',
        marginLeft: '25%'
    },
});