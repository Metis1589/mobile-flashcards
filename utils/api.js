import { AsyncStorage } from 'react-native'
import { formatCalendarResults, APP_STORAGE_KEY } from './_calendar'

export function getDecks() {
    return AsyncStorage.getItem(APP_STORAGE_KEY)
}

export function saveDeckTitle(title) {
    console.log(JSON.stringify({
        [title]: {'title' : title, questions : []}
    }));
    return AsyncStorage.mergeItem(APP_STORAGE_KEY, JSON.stringify({
        [title]: {'title' : title, questions : []}
    }))
}

export function submitEntry({ entry, key }) {
    return AsyncStorage.mergeItem(APP_STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
}

export function removeEntry(key) {
    return AsyncStorage.getItem(APP_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data))
        })
}