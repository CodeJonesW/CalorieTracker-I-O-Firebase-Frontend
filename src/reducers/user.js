let initialState = {
    loggedIn: false,
    userInfo: {}
}

export default (state = initialState, action) => {
    switch (action.type) {

        case "UPDATE_USER":
            return {
              ...state,
              userInfo: action.user,
              loggedIn: true
            }

        case "CLEAR_STATE":
            return initialState

        default: {
            return state
        }
    }
}