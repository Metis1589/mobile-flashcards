import { AsyncStorage } from 'react-native'

export const APP_STORAGE_KEY = 'UdacityFlashCards:application'

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
        .then((data) => JSON.parse(data))
        .then((data) => {
            if(typeof(data[key]) !== 'undefined'){
                data[key].questions.push(card)
                AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data))
            }
        })
        .catch(error => console.log('error!' + error))
}