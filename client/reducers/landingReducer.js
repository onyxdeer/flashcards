import {HANDLE_GET_ALOT_BENTOS} from '../actions/actionTypes.js'

const DEFAULT_STATE = {
  bentos: []
}

function handleGetAlotBentos(state, action) {
  return {bentos: action.payload}
}

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case HANDLE_GET_ALOT_BENTOS:
    return handleGetAlotBentos(state, action)
  }

  return state
}