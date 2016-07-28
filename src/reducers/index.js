import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import flows from './flows/'

const rootReducer = combineReducers({
  flows,
  routing: routerReducer,
})

export default rootReducer
