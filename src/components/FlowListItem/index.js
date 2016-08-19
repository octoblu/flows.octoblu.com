import _ from 'lodash'
import React, { PropTypes } from 'react'
import Button from 'zooid-button'
import {OCTOBLU_URL} from 'config'
import RevealMenuIcon from 'react-icons/lib/md/more-vert'
import moment from 'moment'

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

  toggleMenuVisibility = (event) => {
    event.preventDefault()

    this.setState({
      isMenuVisible: !this.state.isMenuVisible,
    })
  }

  handleDelete = (event) => {
    event.preventDefault()

    const { flow, onDeleteFlow } = this.props
    onDeleteFlow(flow.uuid)
  }

  render() {
    const { flow } = this.props
    if (_.isEmpty(flow)) return null

    const { isMenuVisible } = this.state
    const { draft, name, online, uuid, meshblu } = flow
    const { updatedAt } = meshblu

    return (
      <a href={`${OCTOBLU_URL}/design/${uuid}`} className={styles.flowCard}>
        <div className={styles.title}>
          <span>{name || `Flow ${_.first(uuid.split('-'))}`}</span>

          <div className={styles.actions}>
            <Button
              kind="no-style"
              onClick={this.toggleMenuVisibility}
              name="revealMenuButton"
              size="small"
              className={styles.actionButton}
            >
              <RevealMenuIcon size={21} />
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
        </div>

        <div className={styles.subTitle}>
          <DeviceOnlineIndicator online={online} />
          {
            (!_.isEmpty(updatedAt)) &&
            <span>Updated {moment(updatedAt).fromNow()}</span>
          }
        </div>

        <FlowItemMain draft={draft} />
      </a>
    )
  }
}

export default FlowListItem
