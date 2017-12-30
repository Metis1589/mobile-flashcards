import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { yellow } from '../../utils/colors'

export default class DeckNavigation extends Component {
    onPressNavigate(component){
        if(this.props.component!==component){
            if(component == 'NewDeck'){
                this.props.navigation.navigate(component)
            }
            else{
                this.props.navigation.goBack()
            }
        }
    }
    render() {
        const {component} = this.props
        return (
            <View style={styles.navigationContainer}>
                <TouchableOpacity onPress={this.onPressNavigate.bind(this, 'Deck')} style={ component=='Deck' ? styles.navigationLinkActive : styles.navigationLink }>
                    <Text style={styles.navigationLinkText}>DECKS</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onPressNavigate.bind(this, 'NewDeck')} style={ component=='NewDeck' ? styles.navigationLinkActive : styles.navigationLink}>
                    <Text style={styles.navigationLinkText}>NEW DECK</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navigationContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 50,
        margin: 0
    },
    navigationLinkActive: {
        width: '48%',
        height: 50,
        marginRight: '1%',
        marginLeft: '1%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: yellow
    },
    navigationLink: {
        width: '48%',
        height: 50,
        marginRight: '1%',
        marginLeft: '1%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    navigationLinkText: {
        fontSize: 14,
        fontWeight: 'normal'
    }
});