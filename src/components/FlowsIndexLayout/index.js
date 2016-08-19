import React, { PropTypes } from 'react'
import View from 'react-flexbox'
import Page from 'zooid-page'

import FlowIndexHeader from '../FlowIndexHeader'

const propTypes = {
  children: PropTypes.node,
  creating: PropTypes.bool,
  onCreateFlow: PropTypes.func,
}
const defaultProps = {}

const FlowsIndexLayout = ({ children, creating, onCreateFlow }) => {
  return (
    <Page>
      <View column>
        <FlowIndexHeader
          onCreateFlow={onCreateFlow}
          creatingFlow={creating}
        />
        {children}
      </View>
    </Page>

  )
}

FlowsIndexLayout.propTypes    = propTypes
FlowsIndexLayout.defaultProps = defaultProps

export default FlowsIndexLayout
