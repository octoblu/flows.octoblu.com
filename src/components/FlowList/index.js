import _ from 'lodash'
import React, { PropTypes } from 'react'

import styles from './styles.css'
import FlowListItem from '../FlowListItem/'

const propTypes = {
  flows: PropTypes.array,
  onDeleteFlow: PropTypes.func,
}

const defaultProps = {
  flows: [],
  onDeleteFlow: _.noop,
}

const FlowList = ({flows, onDeleteFlow}) => {
  if(_.isEmpty(flows)) return null

  const flowItems = _.map(flows, flow => {
    if (flow.deleting) return null

    return <FlowListItem flow={flow} key={flow.uuid} onDeleteFlow={onDeleteFlow}/>
  })

  return <div className={styles.flowList}>{flowItems}</div>
}

FlowList.propTypes    = propTypes
FlowList.defaultProps = defaultProps

export default FlowList
