import React, { PropTypes } from 'react'
import Link from 'zooid-button'
import Input from 'zooid-input'

import styles from './styles.css'

const propTypes = {}
const defaultProps = {}

const FlowIndexSidebar = () => {
  return (
    <div className={styles.root}>
      <Input type="search" name="seachFlows" placeholder="Search..." />

      <div className={styles.filters}>
        <Link to="/flows" className={styles.filter}>All Flows</Link>
        <Link to="?filter=online" className={styles.filter}>Online</Link>
        <Link to="?filter=offline" className={styles.filter}>Offline</Link>
      </div>
    </div>
  )
}

FlowIndexSidebar.propTypes    = propTypes
FlowIndexSidebar.defaultProps = defaultProps

export default FlowIndexSidebar
