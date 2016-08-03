import _ from 'lodash'
import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import DeviceIcon from 'zooid-device-icon'
import Heading from 'zooid-heading'

import styles from './styles.css'

const propTypes = {
  creatingFlow: PropTypes.bool,
  onCreateFlow: PropTypes.func,
}

const defaultProps = {
  creatingFlow: false,
  onCreateFlow: _.noop,
}


const FlowIndexHeader = ({ creatingFlow, onCreateFlow }) => {
  const createFlowButton = React.createElement(Button, {
    onClick: onCreateFlow,
    kind: 'primary',
    name: 'createFlow',
    disabled: creatingFlow,
    children: creatingFlow ? 'Creating...' : 'New Flow'
  })

  return (
    <Heading level={3} className={styles.root}>
      <div className={styles.headerTextWrap}>
        <DeviceIcon type="octoblu:flow" size="small" className={styles.deviceIcon} />
        Flows
      </div>

      {createFlowButton}
    </Heading>
  )
}

FlowIndexHeader.propTypes    = propTypes
FlowIndexHeader.defaultProps = defaultProps

export default FlowIndexHeader
