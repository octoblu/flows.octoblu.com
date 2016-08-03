import axios from 'axios'
import { OCTOBLU_API_URL } from 'config'
import { createAction } from 'redux-act'

import { getMeshbluConfig } from '../../services/auth-service'

export const createFlowRequest = createAction('octoblu/flow/create/request')
export const createFlowSuccess = createAction('octoblu/flow/create/success')
export const createFlowFailure = createAction('octoblu/flow/create/failure')

export default function createFlow(octobluAPIUrl=OCTOBLU_API_URL, meshbluConfig=getMeshbluConfig()) {
  const octobluApi = axios.create({
    baseURL: `${octobluAPIUrl}/api`,
    headers: {
      meshblu_auth_uuid: meshbluConfig.uuid,
      meshblu_auth_token: meshbluConfig.token,
    }
  })

  return dispatch => {
    dispatch(createFlowRequest())

    return octobluApi.post(`/flows`)
      .then(({data}) => dispatch(createFlowSuccess(data)))
      .catch((error) => dispatch(createFlowFailure(error)))
  }
}
