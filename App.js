import React from 'react';
import { createStore } from 'redux'
import reducers from './store/reducers'
import { Provider } from 'react-redux'
import { StyleSheet, Platform, Text, View, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Deck from './components/Deck'
import NewDeck from './components/NewDeck'
import DeckView from './components/DeckView'
import { purple, white } from './utils/colors'
import { Constants } from 'expo'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
  )
}

const Tabs = TabNavigator({
  Deck: {
    screen: Deck,
    navigationOptions: {
      tabBarLabel: 'Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NewDeck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})

const store = createStore(reducers);

export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <View style={styles.container}>
            <UdaciStatusBar barStyle="light-content" />
            <MainNavigator></MainNavigator>
          </View>
        </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  }
});
