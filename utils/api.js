import { AsyncStorage } from 'react-native'
import { formatCalendarResults, APP_STORAGE_KEY } from './_calendar'

export function getDecks() {
    return AsyncStorage.getItem(APP_STORAGE_KEY)
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(APP_STORAGE_KEY, JSON.stringify({
        [title]: {'title' : title, questions : []}
    }))
}

export function addCardToDeck(key, card) {
    return AsyncStorage.getItem(APP_STORAGE_KEY)
        .then((results) => {
            let data = JSON.parse(results)
            if(typeof(data[key]) !== 'undefined'){
                data[key].questions.push(card)
                AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data))
            }
        })
        .catch(error => console.log('error!' + error))
}