import _ from 'lodash'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Button from 'zooid-button'
import Card from 'zooid-card'
import {OCTOBLU_URL} from 'config'
import RevealMenuIcon from 'react-icons/lib/md/more-vert'

import styles from './styles.css'

import DeviceOnlineIndicator from '../DeviceOnlineIndicator'
import FlowMenu from '../FlowMenu'
import FlowTags from '../FlowTags'

class FlowListItem extends React.Component {

  static propTypes = {
    flow: PropTypes.object,
  }

  static defaultProps = {
    flow: null,
  }

  state = {
    isMenuVisible: false,
  }

  toggleMenuVisibility = () => {
    this.setState({
      isMenuVisible: !this.state.isMenuVisible,
    })
  }

  render() {
    const { flow } = this.props
    if (_.isEmpty(flow)) return null

    const { isMenuVisible } = this.state
    const { draft, name, online, uuid } = flow

    return (
      <Card className={styles.flowCard}>
        <header className={styles.header}>
          <Link to={`/flows/${uuid}`}>{name}</Link>
          <DeviceOnlineIndicator online={online} />
        </header>

        <div className={styles.flowMenuWrapper}>

          <Button
            kind="no-style"
            onClick={this.toggleMenuVisibility}
            name="revealMenuButton"
            className={styles.flowMenuButton}
          >
            <RevealMenuIcon />
          </Button>

          <FlowMenu
            visible={isMenuVisible}
            onClickOutside={this.toggleMenuVisibility}
            className={styles.flowMenu}
          >
            <Button kind="no-style" size="small">Share</Button>
            <Button kind="no-style" size="small">Publish IoT App</Button>
            <Button kind="no-style" size="small">Delete</Button>
          </FlowMenu>
        </div>

        <div className={styles.tags}>
          <FlowTags nodes={draft.nodes} />
        </div>

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
}

export default FlowListItem
