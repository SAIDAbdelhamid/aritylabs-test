import { AsyncStorage } from 'react-native';

const _getStorage = async (key) => {
    return JSON.parse(await AsyncStorage.getItem(key))
}

const _setStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        // Error saving data
    }
}

export {
    _setStorage,
    _getStorage
};