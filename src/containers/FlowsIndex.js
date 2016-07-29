import _ from 'lodash'
import React, { PropTypes } from 'react'
import { search } from 'redux-meshblu'
import { connect } from 'react-redux'
import View from 'react-flexbox'
import DeviceIcon from 'zooid-device-icon'
import Input from 'zooid-input'
import Heading from 'zooid-heading'
import Page from 'zooid-page'

import FlowList from '../components/FlowList'
import {getMeshbluConfig} from '../services/auth-service'

const propTypes = {
  dispatch: PropTypes.func,
  error: PropTypes.object,
  fetching: PropTypes.bool,
  flows: PropTypes.array,
}

const defaultProps = {}

class FlowsIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    const meshbluConfig = getMeshbluConfig()
    const query = {
      type: 'octoblu:flow',
      owner: meshbluConfig.uuid,
    }

    this.props.dispatch(search({query}, meshbluConfig))
  }

  render() {
    const { flows, error, fetching } = this.props

    if (fetching) return <Page loading />
    if (error) return <Page error={error} />
    if (_.isEmpty(flows)) return <Page>You have no Flows</Page>

    return (
      <Page width="medium">
        <View row>
          <div>
            <Input type="search" name="seachFlows" placeholder="Filter flows" />
          </div>

          <Page>
            <Heading level={3}>
              <DeviceIcon type="octoblu:flow" size="small" />
              My Flows
            </Heading>

            <FlowList flows={flows} />
          </Page>
        </View>
      </Page>
    )
  }
}

FlowsIndex.propTypes    = propTypes
FlowsIndex.defaultProps = defaultProps

const mapStateToProps = ({ flows }) => {
  const { devices, error, fetching } = flows

  return {
    flows: devices,
    error,
    fetching,
  }
}

export default connect(mapStateToProps)(FlowsIndex)
