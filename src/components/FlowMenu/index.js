import classNames from 'classnames'
import React, { PropTypes } from 'react'
import ClickOutside from 'react-click-outside'
import styles from './styles.css'

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  visible: PropTypes.bool,
  onClickOutside: PropTypes.func,
}

const defaultProps = {
  visible: false
}

const FlowMenu = ({ children, className, visible, onClickOutside }) => {
  if (!visible) return null

  return (
    <ClickOutside onClickOutside={onClickOutside}>
      <div className={classNames(className, styles.menu)}>
        {children}
      </div>
    </ClickOutside>
  )
}

FlowMenu.propTypes    = propTypes
FlowMenu.defaultProps = defaultProps

export default FlowMenu
