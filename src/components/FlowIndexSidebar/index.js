import classNames from 'classnames'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Button from 'zooid-button'
import Input from 'zooid-input'

import styles from './styles.css'


const propTypes = {
  filteringFlows: PropTypes.bool,
}

const defaultProps = {
  filteringFlows: false
}

const FlowIndexSidebar = ({ filteringFlows }) => {
  return (
    <div className={styles.root}>
      <Input type="search" name="seachFlows" placeholder="Search..." />

      <div className={styles.filters}>
        <Link
          to={{ pathname: '/flows'}}
          className={classNames(
            styles.filter,
            { [styles.activeFilter]: !filteringFlows },
          )}
          name="allFlowsFilter"
        >
          All Flows
        </Link>

        <Link
          to={{ pathname: '/flows', query: { online: true }}}
          className={styles.filter}
          activeClassName={styles.activeFilter}
        >
          Online
        </Link>

        <Link
          to={{ pathname: '/flows', query: { online: false }}}
          className={styles.filter}
          activeClassName={styles.activeFilter}
        >
          Offline
        </Link>
      </div>
    </div>
  )
}

FlowIndexSidebar.propTypes    = propTypes
FlowIndexSidebar.defaultProps = defaultProps

export default FlowIndexSidebar
