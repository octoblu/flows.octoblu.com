import { expect } from 'chai'
import { searchActions } from 'redux-meshblu'

import reducer from './'

describe('Flows Reducer', () => {
  const initialState = {
    devices: null,
    error: null,
    fetching: false,
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
})
