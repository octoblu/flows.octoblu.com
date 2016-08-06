import _ from 'lodash'
import React, { PropTypes } from 'react'
import { search } from 'redux-meshblu'
import { connect } from 'react-redux'
import View from 'react-flexbox'
import Page from 'zooid-page'

import createFlow from '../actions/create-flow'
import deleteFlow from '../actions/delete-flow'
import filterFlows from '../actions/filter-flows'

import FlowList from '../components/FlowList'
import FlowIndexHeader from '../components/FlowIndexHeader'
import FlowIndexSidebar from '../components/FlowIndexSidebar'

import { getMeshbluConfig } from '../services/auth-service'

const propTypes = {
  creating: PropTypes.bool,
  dispatch: PropTypes.func,
  error: PropTypes.object,
  fetching: PropTypes.bool,
  flows: PropTypes.array,
  location: PropTypes.object,
  onCreateFlow: PropTypes.func,
  onDeleteFlow: PropTypes.func,
  onFilterFlows: PropTypes.func,
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

    const projection = {
      draft: true,
      uuid: true,
      name: true,
      online: true,
    }

    this.props.search({ query, projection }, meshbluConfig)
  }

  render() {
    const {
      creating,
      error,
      fetching,
      flows,
      location: { query },
      onCreateFlow,
      onDeleteFlow,
      onFilterFlows,
    } = this.props

    if (fetching) return <Page loading />
    if (error) return <Page error={error} />
    if (_.isEmpty(flows)) return <Page>You have no Flows</Page>

    return (
      <Page>
        <View column>
          <FlowIndexHeader
            onCreateFlow={onCreateFlow}
            creatingFlow={creating}
          />

          <View row>
            <FlowList flows={flows} onDeleteFlow={onDeleteFlow}/>
            <FlowIndexSidebar
              filteringFlows={!!query.online}
              onFilterFlows={onFilterFlows}
            />
          </View>
        </View>
      </Page>
    )
  }
}

FlowsIndex.propTypes    = propTypes
FlowsIndex.defaultProps = defaultProps

const mapStateToProps = ({ flows }, props) => {
  const {location: { query }} = props
  let { creating, devices, error, fetching, filterQuery, filteredDevices } = flows

  if (filterQuery.length > 0) {
    devices = filteredDevices
  }

  if (query.online) {
    devices = _.filter(devices, {'online': (query.online === 'true')})
  }

  return {
    creating,
    error,
    fetching,
    flows: devices,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateFlow: () => dispatch(createFlow()),
    onDeleteFlow: (uuid) => dispatch(deleteFlow(uuid)),
    onFilterFlows: (query) => dispatch(filterFlows(query)),
    search: (query, meshbluConfig) => dispatch(search(query, meshbluConfig)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlowsIndex)
