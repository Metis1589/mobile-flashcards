import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Button } from 'react-native'
import { MKTextField, MKColor, mdl} from 'react-native-material-kit'
import { getDailyReminderValue, clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { connect } from 'react-redux'

class Quiz extends Component {
    state = {
        answer: '',
        showAnswer : false,
        questionIndex : 0,
        correctAnswersCount : 0
    }
    onCorrectButtonPress(card){
        const {questionIndex} = this.state
        let {correctAnswersCount} = this.state
        if(card.answer === this.state.answer){
            correctAnswersCount++
        }
        this.setState({questionIndex : (questionIndex + 1), answer : '', correctAnswersCount : correctAnswersCount})
    }
    onInCorrectButtonPress(){
        const {questionIndex} = this.state
        this.setState({questionIndex : (questionIndex + 1), answer : ''})
    }
    render() {
        const {navigation} = this.props
        const title = navigation.state.params.title
        const decks = this.props.decks.list
        if(typeof(decks[title])==='undefined'){
            return <View>
                <Text>Not found</Text>
            </View>
        }
        const deck = decks[title]
        const {questionIndex, showAnswer, correctAnswersCount} = this.state
        if(questionIndex===deck.questions.length){
            clearLocalNotification()
                .then(setLocalNotification)
            return <View>
                <Text>Results</Text>
                <Text>You got {correctAnswersCount}/{deck.questions.length} answers</Text>
                <Button
                    onPress={() => this.setState({questionIndex : 0, correctAnswersCount : 0})}
                    title="Restart quiz"
                    color="#000"
                />
                <Button
                    onPress={() => navigation.goBack() }
                    title="Back to deck"
                    color="#000"
                />
            </View>
        }
        const card = deck['questions'][questionIndex]
        return (
            <View>
                <View>
                    <Text>{(questionIndex+1)}/{deck.questions.length}</Text>
                </View>
                {!showAnswer && (
                    <View>
                        <View>
                            <Text>{card.question}</Text>
                        </View>
                        <Button
                            onPress={() => this.setState({showAnswer : true})}
                            title="Show answer"
                            color="#000"
                        />
                        <View>
                            <MKTextField
                                tintColor={MKColor.Grey}
                                placeholder="Answer"
                                onChangeText={(answer) => this.setState({answer})}
                                value={this.state.answer}
                            />
                        </View>
                    </View>
                )}
                {showAnswer && (
                    <View>
                        <View>
                            <Text>{card.answer}</Text>
                        </View>
                        <Button
                            onPress={() => this.setState({showAnswer : false})}
                            title="Show question"
                            color="#000"
                        />
                    </View>
                )}
                <Button
                    onPress={this.onCorrectButtonPress.bind(this, card)}
                    title="Correct"
                    color="#000"
                />
                <Button
                    onPress={this.onInCorrectButtonPress.bind(this)}
                    title="Incorrect"
                    color="#000"
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
)(Quiz)