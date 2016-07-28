import React from 'react'
import { IndexRoute, Route, Router } from 'react-router'
import App from '../containers/App'
import Home from '../containers/Home'
import FlowsLayout from '../containers/FlowsLayout'
import FlowsIndex from '../containers/FlowsIndex'
import FlowDetail from '../containers/FlowDetail'
import NotFound from '../components/NotFound/'

import { storeAuthenticationAndRedirect } from '../services/auth-service'

export default ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="auth/callback" onEnter={storeAuthenticationAndRedirect} />

        <Route path="flows" component={FlowsLayout}>
          <IndexRoute component={FlowsIndex}/>
          <Route path=":flowUuid" component={FlowDetail} />
        </Route>
      </Route>

      <Route path="home" component={Home} />
      <Route path="*" status={404} component={NotFound} />
    </Router>
  )
}
