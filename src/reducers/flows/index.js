import { searchActions } from 'redux-meshblu'

const initialState = {
  devices: null,
  error: null,
  fetching: false,
}

export default function types(state = initialState, action) {
  switch (action.type) {

    case searchActions.searchRequest.getType():
      return { ...state, fetching: true }

    case searchActions.searchSuccess.getType():
      return { ...state, devices: action.payload, fetching: false }

    case searchActions.searchFailure.getType():
      return { ...state, error: action.payload, fetching: false }

    default:
      return state
  }
}
