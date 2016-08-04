import _ from 'lodash'
import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import {OCTOBLU_URL} from 'config'
import RevealMenuIcon from 'react-icons/lib/md/more-vert'

import styles from './styles.css'

import DeviceOnlineIndicator from '../DeviceOnlineIndicator'
import FlowMenu from '../FlowMenu'
import FlowItemMain from '../FlowItemMain'

class FlowListItem extends React.Component {

  static propTypes = {
    flow: PropTypes.object,
    onDeleteFlow: PropTypes.func,
  }

  static defaultProps = {
    flow: null,
    onDeleteFlow: _.noop,
  }

  state = {
    isMenuVisible: false,
  }

  toggleMenuVisibility = () => {
    this.setState({
      isMenuVisible: !this.state.isMenuVisible,
    })
  }

  handleDelete = () => {
    const { flow, onDeleteFlow } = this.props
    onDeleteFlow(flow.uuid)
  }

  render() {
    const { flow } = this.props
    if (_.isEmpty(flow)) return null

    const { isMenuVisible } = this.state
    const { draft, name, online, uuid } = flow



    return (
      <div className={styles.flowCard}>
        <header className={styles.header}>
          <div>
            <Button
              href={`${OCTOBLU_URL}/design/${uuid}`}
              size="large"
              kind="no-style"
              className={styles.flowName}
            >
              {name || `Flow ${_.first(uuid.split('-'))}`}
            </Button>
            <DeviceOnlineIndicator online={online} />
          </div>
          <div className={styles.actions}>
            <Button
              kind="no-style"
              onClick={this.toggleMenuVisibility}
              name="revealMenuButton"
              size="small"
            >
              <RevealMenuIcon className={styles.actionIcon} size={24} />
            </Button>

            <FlowMenu
              visible={isMenuVisible}
              onClickOutside={this.toggleMenuVisibility}
              className={styles.flowMenu}
            >
              <Button kind="no-style">View Detail</Button>
              <Button kind="no-style">Share</Button>
              <Button kind="no-style">Publish IoT App</Button>
              <Button kind="no-style" onClick={this.handleDelete}>Delete</Button>
            </FlowMenu>
          </div>
        </header>

        <FlowItemMain draft={draft} />
      </div>
    )
  }
}

export default FlowListItem
