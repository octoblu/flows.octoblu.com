import _ from 'lodash'
import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import DeviceIcon from 'zooid-device-icon'
import Heading from 'zooid-heading'

import styles from './styles.css'

const propTypes = {
  onCreateFlow: PropTypes.func,
}

const defaultProps = {
  onCreateFlow: _.noop,
}

const FlowIndexHeader = ({ onCreateFlow }) => {
  return (
    <Heading level={3} className={styles.root}>
      <div className={styles.headerTextWrap}>
        <DeviceIcon type="octoblu:flow" size="small" className={styles.deviceIcon} />
        Flows
      </div>

      <Button onClick={onCreateFlow} kind="primary" name="createFlow">Add a Flow</Button>
    </Heading>
  )
}

FlowIndexHeader.propTypes    = propTypes
FlowIndexHeader.defaultProps = defaultProps

export default FlowIndexHeader
