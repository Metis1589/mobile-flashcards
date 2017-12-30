import React from 'react';
import { createStore } from 'redux'
import reducers from './store/reducers'
import { Provider } from 'react-redux'
import Deck from './components/Deck'
import NewDeck from './components/NewDeck'
import DeckView from './components/DeckView'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { StackNavigator } from 'react-navigation'
import { StyleSheet, View, Text, StatusBar } from 'react-native'
import { white, black } from './utils/colors'
import { Constants } from 'expo'


function AppStatusBar ({backgroundColor, ...props}) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}
const MainNavigator = StackNavigator({
    Home: {
        screen: Deck,
        navigationOptions: ({navigation}) => ({
            header: null
        }),
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: ({navigation}) => ({
            header: null
        }),
    },
    Deck: {
        screen: Deck,
        navigationOptions: ({navigation}) => ({
            header: null
        }),
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: ({navigation}) => ({
            title: `Add card`,
        })
    },
    DeckView: {
        screen: DeckView,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.title}`,
        })
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: ({navigation}) => ({
            title: `Quiz`,
        })
    }
},{
    navigationOptions: () => ({
        headerStyle: styles.header,
        headerTintColor: white,
        headerBackTitleStyle: styles.back,
        headerTitleStyle: styles.headerTitle
    })
})

const store = createStore(reducers)

export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <AppStatusBar backgroundColor={black} barStyle="light-content" />
                    <MainNavigator />
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: black,
        height: 50,
        width: '80%',
        padding: 0,
        paddingBottom: 20,
        alignItems: 'flex-start',
        alignContent: 'flex-start',
    },
    back: {
        color: black,
        width: 0,
        height: 0
    },
    headerTitle: {
        color: white,
        marginLeft: 50,
        textAlign: 'left'
    }
})

