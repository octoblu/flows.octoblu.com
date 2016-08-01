import { expect } from 'chai'
import { searchActions } from 'redux-meshblu'

import {
  deleteFlowRequest,
  deleteFlowSuccess,
  deleteFlowFailure
} from '../../actions/deleteFlow/'
import reducer from './'

describe('Flows Reducer', () => {
  const initialState = {
    devices: null,
    error: null,
    fetching: false,
    deleting: [],
  }

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialState)
  })

  it('should handle fetching request', () => {
    expect(
      reducer(undefined, { type: searchActions.searchRequest.getType() })
    ).to.deep.equal({ ...initialState, fetching: true})
  })

  it('should handle GET_FLOWS_SUCCESS', () => {
    const devices = [
      { uuid: 'my-flows-uuid' },
      { uuid: 'my-flows2-uuid'}
    ]

    expect(reducer(undefined, {
      type: searchActions.searchSuccess.getType(),
      payload: devices
    })).to.deep.equal({...initialState, devices })
  })

  it('should handle GET_FLOWS_FAILURE', () => {
    expect(reducer(undefined, {
      type: searchActions.searchFailure.getType(),
      payload: new Error('Bang!')
    })).to.deep.equal({...initialState, error: new Error('Bang!') })
  })


  describe('deleteFlow', () => {
    it('should handle deleteFlowRequest', () => {
      expect(reducer(undefined, {
        type: deleteFlowRequest.getType(),
        payload: 'fancy-uuid'
      })).to.deep.equal({...initialState, deleting: ['fancy-uuid']})
    })

    it('should handle deleteFlowFailure', () => {
      expect(reducer({...initialState, deleting: ['fancy-uuid', 'another-uuid']}, {
        type: deleteFlowFailure.getType(),
        payload: 'fancy-uuid'
      })).to.deep.equal({...initialState, deleting: ['another-uuid'], error: new Error('Could not delete flow - fancy-uuid')})
    })

    it('should handle deleteFlowSuccess', () => {
      expect(reducer({
        ...initialState,
        deleting: ['fancy-uuid', 'another-uuid'],
        devices: [
          { uuid: 'one-uuid' },
          { uuid: 'fancy-uuid' },
          { uuid: 'another-uuid' },
        ]
      }, {
        type: deleteFlowSuccess.getType(),
        payload: 'fancy-uuid'
      })).to.deep.equal({
        ...initialState,
        deleting: ['another-uuid'],
        devices:[
          { uuid: 'one-uuid' },
          { uuid: 'another-uuid' },
        ]})
    })

  })
})
