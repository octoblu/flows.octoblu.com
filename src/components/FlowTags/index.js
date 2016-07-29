import _ from 'lodash'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import DeviceIcon from 'zooid-device-icon'

import styles from './styles.css'

const propTypes = {
  nodes: PropTypes.array,
}

const defaultProps = {
  nodes:[],
}

const FlowTags = ({ nodes }) => {
  const nonOpertationNodes      = _.filter(nodes, (node) => !(node.category === 'operation'))
  const uniqueNodesOfTypeThings = _.take(_.uniqBy(nonOpertationNodes, 'type'), 6)

  const tags = _.map(uniqueNodesOfTypeThings, (node) => {
    return (
      <Link to={`/flows?tag=${node.type}`} key={node.type}>
        <DeviceIcon type={`${node.type}`} className={styles.tagIcon} />
      </Link>
    )
  })

  if (_.isEmpty(tags)) return null

  return <div>{tags}</div>
}

FlowTags.propTypes    = propTypes
FlowTags.defaultProps = defaultProps

export default FlowTags
