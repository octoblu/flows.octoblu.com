import { expect } from 'chai'
import { searchActions } from 'redux-meshblu'

import {
  createFlowRequest,
  createFlowSuccess,
  createFlowFailure,
} from '../../actions/create-flow/'

import {
  deleteFlowRequest,
  deleteFlowSuccess,
  deleteFlowFailure,
} from '../../actions/delete-flow/'

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

  describe('fetchFlow', () => {
    it('should handle fetching request', () => {
      expect(
        reducer(undefined, { type: searchActions.searchRequest.getType() })
      ).to.deep.equal({ ...initialState, fetching: true})
    })

    it('should handle fetching success', () => {
      const devices = [
        { uuid: 'my-flows-uuid' },
        { uuid: 'my-flows2-uuid'}
      ]

      expect(reducer(undefined, {
        type: searchActions.searchSuccess.getType(),
        payload: devices
      })).to.deep.equal({...initialState, devices })
    })

    it('should handle fetching failure', () => {
      expect(reducer(undefined, {
        type: searchActions.searchFailure.getType(),
        payload: new Error('Bang!')
      })).to.deep.equal({...initialState, error: new Error('Bang!') })
    })
  })

  describe('createFlow', () => {
    it('should handle createFlowRequest', () => {
      expect(
        reducer(undefined, { type: createFlowRequest })
      ).to.deep.equal({ ...initialState, creating: true })
    })

    it('should handle createFlowSuccess', () => {
      const state = {
        ...initialState,
        creating: true,
        devices: [
          { uuid: 'flow-uuid-1' },
          { uuid: 'flow-uuid-2' },
        ]
      }

      const expectedState = {
        ...initialState,
        creating: false,
        devices: [
          { uuid: 'flow-uuid-0' },
          { uuid: 'flow-uuid-1' },
          { uuid: 'flow-uuid-2' },
        ]
      }

      expect(reducer(state, {
        type: createFlowSuccess,
        payload: { flowId: 'flow-uuid-0' }
      })).to.deep.equal(expectedState)
    })

    it('should handle createFlowFailure', () => {
      const state = {
        ...initialState,
        creating: true,
        devices: [
          { uuid: 'flow-uuid-1' },
          { uuid: 'flow-uuid-2' },
        ]
      }

      const expectedState = {
        ...state,
        creating: false,
        error: new Error('cats!')
      }

      expect(reducer(state, {
        type: createFlowFailure,
        payload: new Error('cats!')
      })).to.deep.equal(expectedState)
    })
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
