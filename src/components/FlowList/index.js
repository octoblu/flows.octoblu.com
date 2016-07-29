import _ from 'lodash'
import React, { PropTypes } from 'react'

import styles from './styles.css'
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

  return <div className={styles.flowList}>{flowItems}</div>
}

FlowList.propTypes    = propTypes
FlowList.defaultProps = defaultProps

export default FlowList
