import _ from 'lodash'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Button from 'zooid-button'
import Card from 'zooid-card'
import {OCTOBLU_URL} from 'config'

import DeviceOnlineIndicator from '../DeviceOnlineIndicator'

import styles from './styles.css'

const propTypes = {
  flow: PropTypes.object,
}
const defaultProps = {
  flow: null,
}

const FlowListItem = ({ flow }) => {
  if (_.isEmpty(flow)) return null

  const { uuid, name, online } = flow

  return (
    <Card className={styles.flowCard}>
      <header className={styles.header}>
        <Link to={`/flows/${uuid}`}>{name}</Link>
        <DeviceOnlineIndicator online={online} />
      </header>

      <Button
        href={`${OCTOBLU_URL}/design/${uuid}`}
        kind="hollow-neutral"
        size="small"
      >
        Design
      </Button>
    </Card>
  )
}

FlowListItem.propTypes    = propTypes
FlowListItem.defaultProps = defaultProps

export default FlowListItem
