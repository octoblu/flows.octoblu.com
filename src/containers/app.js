import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { AppBar, AppBarPrimary, AppBarSecondary } from 'zooid-ui'
import Authenticated from './Authenticated'
import {OCTOBLU_URL} from 'config'

import 'zooid-ui/dist/style.css'

const propTypes = {
  children: PropTypes.element.isRequired,
}

export default class App extends React.Component {
  render() {
    return (
      <Authenticated>
        <AppBar>
          <AppBarPrimary>
            <a className="OctobluAppBar-link OctobluAppBar-link--logo" href={OCTOBLU_URL}>
              <img className="OctobluAppBar-logo" src="//d2zw6j512x6z0x.cloudfront.net/master/d48dc0bf063ecc1477d1163831ee8ff17efbbfae/assets/images/octoblu_logo.png" />
            </a>

            <nav className="OctobluAppBar-nav OctobluAppBar-nav--primary" role="navigation">
              <a className="OctobluAppBar-link" href="/">Flows</a>
            </nav>
          </AppBarPrimary>

          <AppBarSecondary>
            <Link to="/logout" className="OctobluAppBar-link">Sign out</Link>
          </AppBarSecondary>
        </AppBar>
        {this.props.children}
      </Authenticated>
    )
  }
}

App.propTypes = propTypes
