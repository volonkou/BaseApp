import Types from "../types"
import LanguageAction from "../../expand/language"

/**
 * 语言变更
 * @param language
 * @returns {{type: string, theme: *}}
 */
export function onLanguageChange(language) {
    return {type: Types.LANGUAGE_CHANGE, language: language}
}

/**
 * 初始化语言
 * @returns {Function}
 */
export function onLanguageInit() {
    return dispatch => {
        new LanguageAction().getLanguage().then((data) => {
            dispatch(onLanguageChange(data))
        })
    }
}
/**
 * 显示自定义语言浮层
 * @param show
 * @returns {{type: *, customLanguageViewVisible: *}}
 */
export function onShowCustomLanguageView(show) {
    return {type: Types.SHOW_LANGUAGE_VIEW, customLanguageViewVisible: show};
}