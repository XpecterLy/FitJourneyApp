import AsyncStorage from "@react-native-async-storage/async-storage";

export class storageAdapter {
    static getStorage = async (key: string) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            throw new Error(`Error to get item: ${key}`);
        }
    }

    static setStorage = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            throw new Error(`Error to set item: ${key}`);
        }
    }

    static removeStorage = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            throw new Error(`Error to remove item: ${key}`);
        }
    }
}