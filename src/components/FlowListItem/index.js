import _ from 'lodash'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Button from 'zooid-button'
import {OCTOBLU_URL} from 'config'
import RevealMenuIcon from 'react-icons/lib/md/more-vert'

import styles from './styles.css'

import DeviceOnlineIndicator from '../DeviceOnlineIndicator'
import FlowMenu from '../FlowMenu'
import FlowTags from '../FlowTags'

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
          <div className={styles.nameWrapper}>
            <Link to={`${OCTOBLU_URL}/design/${uuid}`}>{name || `Flow ${_.first(uuid.split('-'))}`}</Link>
            <DeviceOnlineIndicator online={online} />
          </div>

          <div className={styles.actions}>
            <Button kind="hollow-neutral" size="small">Share</Button>
            <Button
              kind="hollow-neutral"
              onClick={this.toggleMenuVisibility}
              name="revealMenuButton"
              size="small"
            >
              More
            </Button>

            <FlowMenu
              visible={isMenuVisible}
              onClickOutside={this.toggleMenuVisibility}
              className={styles.flowMenu}
            >
              <Button kind="no-style">View Detail</Button>
              <Button kind="no-style">Publish IoT App</Button>
              <Button kind="no-style" onClick={this.handleDelete}>Delete</Button>
            </FlowMenu>
          </div>
        </header>

        {
          draft &&
          (
            <div>
              <div>{draft.description}</div>
              <FlowTags nodes={draft.nodes} />
            </div>
          )

        }
      </div>
    )
  }
}

export default FlowListItem
