import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'
import { Link } from 'react-router'
import DeviceIcon from 'zooid-device-icon'

import FlowTags from './'
import styles from './styles.css'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<FlowTags />', () => {
  describe('when gives a list of nodes as prop', () => {
    let nodes
    beforeEach(() => {
      nodes =  [
        {
          category: 'device',
          type: 'device:blink1',
        },
        {
          category: 'device',
          type: 'device:blink1',
        },
        {
          category: 'operation',
          type: 'operation:interval',
        },
        {
          type: 'operation:delay',
          category: 'operation',
        },
        {
          type: 'operation:delay',
          category: 'operation',
        },
        {
          category: 'device',
          type: 'device:blink1',
        }
      ]
    })

    it('should only render nodes that are Things', () => {
      const sut = shallow(<FlowTags nodes={nodes} />)
      expect(sut).to.contain(
        <Link to="/flows?tag=device:blink1">
          <DeviceIcon type="device:blink1" className={styles.tagIcon} />
        </Link>
      )
    })
  })

  describe('when nodes is an empty list', () => {
    it('should render nothing', () => {
      const sut = shallow(<FlowTags nodes={[]} />)
      expect(sut).to.be.empty
    })
  })
})
