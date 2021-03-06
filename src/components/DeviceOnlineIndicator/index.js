import React, { PropTypes } from 'react'
import FaCircle from 'react-icons/lib/fa/circle'
import FaCircleHollow from 'react-icons/lib/fa/circle-o'

import styles from './styles.css'

const propTypes = {
  online: PropTypes.bool
}

const defaultProps = {
  online: false
}

const DeviceOnlineIndicator = ({ online }) => {
  if (online) {
    return (
      <span className={styles.indicator}>
        <FaCircle className={styles.onlineIcon}/>Online
      </span>
    )
  }

  return (
    <span className={styles.indicator}>
      <FaCircleHollow className={styles.icon}/>Offline
    </span>
  )
}

DeviceOnlineIndicator.propTypes    = propTypes
DeviceOnlineIndicator.defaultProps = defaultProps

export default DeviceOnlineIndicator
