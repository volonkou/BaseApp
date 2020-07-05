import AsyncStorage from '@react-native-community/async-storage';
import ThemeFactory,{ThemeFlags} from "../util/themeFactory"

const THEME_KEY = 'theme_key'
export default class ThemeAction {

    getTheme() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(THEME_KEY, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {
                    this.save(ThemeFlags.Default);
                    result = ThemeFlags.Default;
                }
                resolve(ThemeFactory.createTheme(result))
            });
        });
    }

    save(themeFlag) {
        AsyncStorage.setItem(THEME_KEY, themeFlag, (error => {
        }))
    }
}