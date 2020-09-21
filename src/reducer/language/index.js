import Types from "../../action/types"
import languageFactory, { LanguageFlags } from "../../util/languageFactory"

const defaultState = {
    language: languageFactory.createLanguage(LanguageFlags.Default),
    onShowCustomLanguageView: false
}

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.LANGUAGE_CHANGE:
            return {
                ...state,
                language: action.language.language
            };

        case Types.SHOW_LANGUAGE_VIEW:
            return {
                ...state,
                customLanguageViewVisible: action.customLanguageViewVisible
            };

        default:
            return state
    }
}