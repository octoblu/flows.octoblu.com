import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { shallow, mount } from 'enzyme'
import React from 'react'
import sinonChai from 'sinon-chai'
import Button from 'zooid-button'

import { OCTOBLU_URL } from 'config'

import styles from './styles.css'

import FlowListItem from './'
import DeviceOnlineIndicator from '../DeviceOnlineIndicator'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<FlowListItem />', () => {
  describe('when flow prop is null', () => {
    it('should render nothing', () => {
      const sut = shallow(<FlowListItem />)
      expect(sut).to.be.empty
    })
  })

  describe('when give a valid flow', () => {
    let flow
    let sut

    beforeEach('initialize valid flow', () => {
      flow = {
        uuid: '007',
        name: 'Flow 007',
        type: 'octoblu:flow',
        online: true,
        meshblu: {
          updatedAt: null,
        },
        draft: {
          description: 'lorem description',
          nodes: [
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
        }
      }
      sut = mount(<FlowListItem flow={flow} />)
    })

    it('should set isMenuVisible state to false', () => {
      expect(sut).to.have.state('isMenuVisible', false)
    })

    it('should render Design link', () => {
      expect(sut).to.contain(<span>Flow 007</span>)
    })

    it('should render flow online status', () => {
      expect(sut).to.contain(<DeviceOnlineIndicator online />)
    })

    describe('when revealMenuButton is clicked', () => {
      it('should update isMenuVisible state to true', () => {
        const revealMenuButton = sut.find('[name="revealMenuButton"]')
        revealMenuButton.simulate('click')
        expect(sut).to.have.state('isMenuVisible', true)
      })
    })
  })
})
