import _ from 'lodash'
import React, { PropTypes } from 'react'

import FlowTags from '../FlowTags'

import styles from './styles.css'

const propTypes = {
  draft: PropTypes.object,
}
const defaultProps = {
  draft: null,
}

const FlowItemMain = ({draft}) => {
  if (_.isEmpty(draft)) return null

  const { description, nodes } = draft

  let tags = null
  if (!_.isEmpty(nodes)) tags = <FlowTags nodes={nodes} />

  let descriptionBlock = null
  if (!_.isEmpty(description)) descriptionBlock = <div name="description">{description}</div>

  return (
    <main className={styles.main}>
      {tags}
      {descriptionBlock}
    </main>
  )
}

FlowItemMain.propTypes    = propTypes
FlowItemMain.defaultProps = defaultProps

export default FlowItemMain
