import { GET_SIDE_EFFECTS_SUCCESS, UPDATE_SIDE_EFFECTS, GET_SIDE_EFFECTS } from '../constants/constants'
export const INITIAL_STATE = {
    effects: null,
    loading: true,
  }

export const sideEffectReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_SIDE_EFFECTS_SUCCESS:
            return {
                ...state,
                data:action.payload,
                loading: false
            };
        case GET_SIDE_EFFECTS:
            return {
                loading: true
            };
        case UPDATE_SIDE_EFFECTS:
            return {
                ...state,
                data : state.data.map(effect => {
                    if (effect.id===action.payload.id) {
                            return {...effect, label:action.payload.name}
                    }
                    else {
                        return effect
                    }
                 })
            }
      default:
        return state;
    }
  };