let initialState = {
    consumptions: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_CONSUMPTION":
            let newArr = state.consumptions.slice()
            return {
              ...state,
              consumptions: [...action.foodArr, ...newArr]
            }

        default: {
            return state
        }
    }
}