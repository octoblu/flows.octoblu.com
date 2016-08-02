import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import Input from 'zooid-input'

import styles from './styles.css'

const propTypes = {}
const defaultProps = {}

const FlowIndexSidebar = () => {
  return (
    <div className={styles.root}>
      <Input type="search" name="seachFlows" placeholder="Search..." />

      <div>
        <Button kind="no-style">All Flows</Button>
        <Button kind="no-style">Online</Button>
        <Button kind="no-style">Offline</Button>
      </div>
    </div>
  )
}

FlowIndexSidebar.propTypes    = propTypes
FlowIndexSidebar.defaultProps = defaultProps

export default FlowIndexSidebar
