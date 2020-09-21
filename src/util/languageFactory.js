
import {Default} from "./language/cn"
import {EN} from "./language/en"
export const LanguageFlags = {
    Default: "中文",
    EN: "Engilsh"
};


export default class LanguageFactory {
    static createLanguage(languageFlag) {
        let rerutnLanguage
        if(languageFlag=="Default"){
            rerutnLanguage=Default
        }else{
            rerutnLanguage=EN
        }

        return {
            language: rerutnLanguage
        }

    }
}
