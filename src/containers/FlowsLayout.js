import React, { PropTypes } from 'react'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const defaultProps = {}

class Flows extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

Flows.propTypes    = propTypes
Flows.defaultProps = defaultProps

export default Flows
