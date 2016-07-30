import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { shallow } from 'enzyme'
import React from 'react'
import { Link } from 'react-router'
import sinonChai from 'sinon-chai'
import Button from 'zooid-button'

import { OCTOBLU_URL } from 'config'

import FlowListItem from './'
import DeviceOnlineIndicator from '../DeviceOnlineIndicator'
import FlowTags from '../FlowTags'

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
        flow: {
          description: 'lorem description',
        },
        draft: {
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
      sut = shallow(<FlowListItem flow={flow} />)
    })

    it('should set isMenuVisible state to false', () => {
      expect(sut).to.have.state('isMenuVisible', false)
    })

    it('should render a detail link', () => {
      expect(sut).to.contain(<Link to={`/flows/${flow.uuid}`}>Flow 007</Link>)
    })

    it('should render Design link', () => {
      expect(sut).to.contain(
        <Button
          href={`${OCTOBLU_URL}/design/${flow.uuid}`}
          size="small"
          kind="hollow-neutral"
        >
          Design
        </Button>
      )
    })

    it('should render flow online status', () => {
      expect(sut).to.contain(<DeviceOnlineIndicator online />)
    })

    it('should render tags for the flow', () => {
      expect(sut).to.contain(<FlowTags nodes={flow.draft.nodes} />)
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
