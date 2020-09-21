import Types from "../../action/types"
const defaultState = {
    customLoginViewVisible: false
}

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.SHOW_LOGIN_VIEW:
            return {
                ...state,
                customLoginViewVisible: action.customLoginViewVisible
            };

        default:
            return state
    }
}