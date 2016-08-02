import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import DeviceIcon from 'zooid-device-icon'
import Heading from 'zooid-heading'

import styles from './styles.css'

const propTypes = {}
const defaultProps = {}

const FlowIndexHeader = () => {
  return (
    <Heading level={3} className={styles.root}>
      <div className={styles.headerTextWrap}>
        <DeviceIcon type="octoblu:flow" size="small" className={styles.deviceIcon} />
        Flows
      </div>

      <Button kind="primary">Add a Flow</Button>
    </Heading>
  )
}

FlowIndexHeader.propTypes    = propTypes
FlowIndexHeader.defaultProps = defaultProps

export default FlowIndexHeader
