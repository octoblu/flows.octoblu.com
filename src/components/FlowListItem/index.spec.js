import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount, shallow } from 'enzyme'
import React from 'react'
import { Link } from 'react-router'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import Button from 'zooid-button'
import DeviceIcon from 'zooid-device-icon'

import { OCTOBLU_URL } from 'config'

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
        flow: {
          description: 'lorem description',
        },
      }
      sut = shallow(<FlowListItem flow={flow} />)
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
  })
})
