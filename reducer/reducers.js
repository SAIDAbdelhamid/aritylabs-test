export const INITIAL_STATE = {
    data: null,
    loading: false,
  }

export const sideEffectReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_SIDE_EFFECTS_SUCCESS":
            return {
                ...state,
                data:action.payload,
                loading: false
            };
        case "GET_SIDE_EFFECTS":
            return {
                loading: true
            };
      default:
        return state;
    }
  };