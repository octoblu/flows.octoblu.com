import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import enableDestroy from 'server-destroy'
import shmock from 'shmock'

import deleteFlow, {
  deleteFlowRequest,
  deleteFlowSuccess,
  deleteFlowFailure,
} from './'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('DeleteFlow Actions', () => {
  let octobluMock
  let meshbluConfig
  let octobluAPIUrl = `http://127.0.0.1:${0xd00d}`

  before(() => {
    meshbluConfig = {
      hostname: '127.0.0.1',
      port: 0xd00d,
      protocol: 'http',
      uuid: 'my-user-uuid',
      token: 'my-user-token',
    }

    octobluMock = shmock(0xd00d)

    enableDestroy(octobluMock)
  })

  after((done) => {
    octobluMock.destroy(done)
  })

  describe('when the request succeeds', () => {
    beforeEach(() => {
      octobluMock
        .delete('/api/flows/good-flow-uuid')
        .reply(200, {uuid: 'good-flow-uuid'})
    })

    const expectedActions = [
      { type: deleteFlowRequest.getType(), payload: 'good-flow-uuid' },
      { type: deleteFlowSuccess.getType(), payload: 'good-flow-uuid' },
    ]

    const store = mockStore({devices: {}})

    it('should dispatch success', () => {
      return store.dispatch(deleteFlow('good-flow-uuid', octobluAPIUrl,  meshbluConfig))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })

  describe('when the request fails', () => {
    beforeEach(() => {
      octobluMock
        .delete('/api/flows/bad-flow-uuid')
        .reply(403, 'Forbidden')
    })

    const expectedActions = [
      { type: deleteFlowRequest.getType(), payload: 'undefined' },
      {
        type: deleteFlowFailure.getType(),
        payload: new Error('Forbidden')
      },
    ]
    const store = mockStore({ devices: {} })

    it('should dispatch failure', () => {
      return store.dispatch(deleteFlow('bad-flow-uuid', octobluAPIUrl, meshbluConfig))
        .catch(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })
})
