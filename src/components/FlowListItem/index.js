import _ from 'lodash'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Button from 'zooid-button'
import Card from 'zooid-card'
import DeviceIcon from 'zooid-device-icon'

import {OCTOBLU_URL} from 'config'

const propTypes = {
  flow: PropTypes.object,
}
const defaultProps = {
  flow: null,
}

const FlowListItem = ({ flow }) => {
  if (_.isEmpty(flow)) return null

  const { uuid, name, online, type } = flow

  return (
    <Card>
      <DeviceIcon type={type} />
      <Link to={`/flows/${uuid}`}>{name}</Link>
      <div>{ online ? 'online' : 'offline' }</div>

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
