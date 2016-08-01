import axios from 'axios'
import { OCTOBLU_API_URL } from 'config'
import { createAction } from 'redux-act'

import { getMeshbluConfig } from '../../services/auth-service'

export const deleteFlowRequest = createAction('octoblu/flow/delete/request')
export const deleteFlowSuccess = createAction('octoblu/flow/delete/success')
export const deleteFlowFailure = createAction('octoblu/flow/delete/failure')


export default function deleteFlow(flowUuid, octobluAPIUrl=OCTOBLU_API_URL, meshbluConfig = getMeshbluConfig()) {
  return dispatch => {
    dispatch(deleteFlowRequest(flowUuid))

    return axios.delete(`${octobluAPIUrl}/api/flows/${flowUuid}`, {
      headers: {
        meshblu_auth_uuid: meshbluConfig.uuid,
        meshblu_auth_token: meshbluConfig.token,
      }
    })
      .then(() =>  dispatch(deleteFlowSuccess(flowUuid)))
      .catch((error) => dispatch(deleteFlowFailure(error)))
  }
}
