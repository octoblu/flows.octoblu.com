import _ from 'lodash'
import React, { PropTypes } from 'react'
import { search } from 'redux-meshblu'
import { connect } from 'react-redux'
import View from 'react-flexbox'
import Page from 'zooid-page'

import deleteFlow from '../actions/deleteFlow'
import createFlow from '../actions/createFlow'
import FlowList from '../components/FlowList'
import FlowIndexHeader from '../components/FlowIndexHeader'
import FlowIndexSidebar from '../components/FlowIndexSidebar'
import { getMeshbluConfig } from '../services/auth-service'

const propTypes = {
  dispatch: PropTypes.func,
  error: PropTypes.object,
  fetching: PropTypes.bool,
  flows: PropTypes.array,
  onCreateFlow: PropTypes.func,
  onDeleteFlow: PropTypes.func,
  search: PropTypes.func,
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

    this.props.search({query}, meshbluConfig)
  }

  render() {
    const { flows, error, fetching, onCreateFlow, onDeleteFlow } = this.props

    if (fetching) return <Page loading />
    if (error) return <Page error={error} />
    if (_.isEmpty(flows)) return <Page>You have no Flows</Page>

    return (
      <Page>
        <View column>
          <FlowIndexHeader onCreateFlow={onCreateFlow} />

          <View row>
            <FlowList flows={flows} onDeleteFlow={onDeleteFlow}/>
            <FlowIndexSidebar />
          </View>
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

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteFlow: (uuid) => {
      dispatch(deleteFlow(uuid))
    },
    onCreateFlow: () => dispatch(createFlow()),
    search: (query, meshbluConfig) => {
      dispatch(search(query, meshbluConfig))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlowsIndex)
