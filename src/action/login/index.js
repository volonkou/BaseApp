import Types from "../types"

export function onShowLoginView(show) {
    return {type: Types.SHOW_LOGIN_VIEW, customLoginViewVisible: show};
}