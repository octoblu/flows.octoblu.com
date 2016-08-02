import { expect } from 'chai'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import enableDestroy from 'server-destroy'
import shmock from 'shmock'

import createFlow, {
  createFlowRequest,
  createFlowSuccess,
  createFlowFailure,
} from './'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Create Flow Actions', () => {
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
        .post('/api/flows')
        .reply(201, {flowId: 'good-flow-uuid', name: 'Flow good'})
    })

    const expectedActions = [
      { type: createFlowRequest.getType(), payload: undefined },
      {
        type: createFlowSuccess.getType(),
        payload: {
          flowId: 'good-flow-uuid',
          name: 'Flow good',
        }
      },
    ]

    const store = mockStore({devices: {}})

    it('should dispatch success', () => {
      return store.dispatch(createFlow(octobluAPIUrl,  meshbluConfig))
        .then(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })

  describe('when the request fails', () => {
    beforeEach(() => {
      octobluMock
        .post('/api/flows')
        .reply(403, 'Forbidden')
    })

    const expectedActions = [
      { type: createFlowRequest.getType(), payload: 'undefined' },
      {
        type: createFlowFailure.getType(),
        payload: new Error('Forbidden')
      },
    ]
    const store = mockStore({ devices: {} })

    it('should dispatch failure', () => {
      return store.dispatch(createFlow(octobluAPIUrl, meshbluConfig))
        .catch(() => {
          expect(store.getActions()).to.deep.equal(expectedActions)
        })
    })
  })
})
