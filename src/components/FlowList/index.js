import React, { PropTypes } from 'react'
import _ from 'lodash'
import FlowListItem from '../FlowListItem/'
const propTypes = {
  flows: PropTypes.array
}

const defaultProps = {
  flows: []
}

const FlowList = ({flows}) => {
  if(_.isEmpty(flows)) return null

  const flowItems = _.map(flows, flow => <FlowListItem flow={flow} key={flow.uuid} />)

  return(<div>{flowItems}</div>)
}

FlowList.propTypes    = propTypes
FlowList.defaultProps = defaultProps

export default FlowList
