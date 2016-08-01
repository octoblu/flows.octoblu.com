import _ from 'lodash'
import { createReducer } from 'redux-act'
import { searchActions } from 'redux-meshblu'
import { deleteFlowRequest, deleteFlowSuccess, deleteFlowFailure } from '../../actions/deleteFlow/'

const { searchRequest, searchSuccess, searchFailure } = searchActions

const initialState = {
  devices: null,
  error: null,
  fetching: false,
  deleting: [],
}


export default createReducer({
  [deleteFlowRequest]: (state, payload) => {
    const { deleting } = state
    const deletingList = [ ...deleting, payload ]

    return { ...state, deleting: deletingList }
  },
  [deleteFlowSuccess]: (state, payload) => {
    const { devices, deleting } = state
    const updatedFlows          = _.reject(devices, {uuid: payload})
    const deletingList          = _.reject(deleting, (deletingUuid) => deletingUuid === payload)

    return { ...state, devices: updatedFlows, deleting: deletingList }
  },
  [deleteFlowFailure]: (state, payload) => {
    const { deleting } = state
    const deletingList = _.reject(deleting, (deletingUuid) =>  deletingUuid === payload)

    return { ...state, deleting: deletingList, error: new Error(`Could not delete flow - ${payload}`) }
  },
  [searchRequest]: () => ({...initialState, fetching: true}),
  [searchSuccess]: (state, payload) => ({...initialState, devices: payload, fetching: false}),
  [searchFailure]: (state, payload) => ({...initialState, error: payload, fetching: false}),
}, initialState)
