import _ from 'lodash'
import React, { PropTypes } from 'react'
import View from 'react-flexbox'
import { connect } from 'react-redux'
import { search } from 'redux-meshblu'
import ErrorState from 'zooid-error-state'
import Page from 'zooid-page'

import createFlow from '../actions/create-flow'
import deleteFlow from '../actions/delete-flow'
import filterFlows from '../actions/filter-flows'

import FlowList from '../components/FlowList'
import FlowIndexSidebar from '../components/FlowIndexSidebar'
import FlowsIndexLayout from '../components/FlowsIndexLayout'

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
      'meshblu.createdAt': true,
      'meshblu.updatedAt': true,
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

    const flowIndexLayoutProps = {
      onCreateFlow,
      creatingFlow: creating
    }

    if (fetching) return (
      <FlowsIndexLayout {...flowIndexLayoutProps}>
        <Page loading />
      </FlowsIndexLayout>
    )

    if (error) return (
      <FlowsIndexLayout {...flowIndexLayoutProps}>
        <ErrorState
          title="Oops... Something went wrong."
          description={error.message}
        />
      </FlowsIndexLayout>
    )

    if (_.isEmpty(flows)) return (
      <FlowsIndexLayout {...flowIndexLayoutProps}>
        <ErrorState
          title="Darn, you don't have any Flows."
          description="Hang on... We've made it very easy to create one."
          buttonText="Create Flow"
          onClick={onCreateFlow}
        />
      </FlowsIndexLayout>
    )

    return (
      <FlowsIndexLayout {...flowIndexLayoutProps}>
        <View row>
          <FlowList flows={flows} onDeleteFlow={onDeleteFlow} />
          <FlowIndexSidebar filteringFlows={!!query.online} onFilterFlows={onFilterFlows} />
        </View>
      </FlowsIndexLayout>
    )
  }
}

FlowsIndex.propTypes    = propTypes
FlowsIndex.defaultProps = defaultProps

const mapStateToProps = ({ flows }, props) => {
  const { query } = props.location
  let {
    creating,
    devices,
    error,
    fetching,
    filteredDevices,
    filterQuery,
  } = flows

  if (filterQuery.length > 0) devices = filteredDevices
  if (query.online) devices = _.filter(devices, {'online': (query.online === 'true')})

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
