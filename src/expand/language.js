import AsyncStorage from '@react-native-community/async-storage';
import LanguageFactory,{LanguageFlags} from "../util/languageFactory"

const LANGUAGE_KEY = 'language_key'
export default class LanguageAction {

    getLanguage() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(LANGUAGE_KEY, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {
                    this.save("Default");
                    result = LanguageFactory.createLanguage(Default);
                }
                resolve(LanguageFactory.createLanguage(result))
            });
        });
    }

    save(languageFlag) {
        AsyncStorage.setItem(LANGUAGE_KEY, languageFlag, (error => {
        }))
    }
}