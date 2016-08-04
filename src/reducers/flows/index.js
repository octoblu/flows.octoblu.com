import _ from 'lodash'
import { createReducer } from 'redux-act'
import { searchActions } from 'redux-meshblu'

import filterFlows from '../../actions/filter-flows/'
import { createFlowRequest, createFlowSuccess, createFlowFailure } from '../../actions/create-flow/'
import { deleteFlowRequest, deleteFlowSuccess, deleteFlowFailure } from '../../actions/delete-flow/'

const { searchRequest, searchSuccess, searchFailure } = searchActions

const initialState = {
  devices: null,
  error: null,
  fetching: false,
  deleting: [],
  filteredDevices: [],
}

export default createReducer({
  [createFlowRequest]: (state) => {
    return { ...state, creating: true, error: null }
  },
  [createFlowSuccess]: (state, payload) => {
    const updatedDevices = [ { uuid: payload.flowId }, ...state.devices ]

    return { ...state, creating: false, devices: updatedDevices }
  },
  [createFlowFailure]: (state, payload) => {
    return { ...state, creating: false, error: payload }
  },
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
  [filterFlows]: (state, payload) => {
    const { devices } = state

    payload = _.toLower(_.trim(payload))

    const filteredDevices = _.filter(devices, (device) => {
      return (device.uuid.indexOf(payload) !== -1)
    })

    return { ...state, filteredDevices }
  },
  [searchRequest]: () => ({...initialState, fetching: true}),
  [searchSuccess]: (state, payload) => ({...initialState, devices: payload, fetching: false}),
  [searchFailure]: (state, payload) => ({...initialState, error: payload, fetching: false}),
}, initialState)
