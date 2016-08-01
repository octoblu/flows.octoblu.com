import _ from 'lodash'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'

import FlowList from './'
import FlowListItem from '../FlowListItem/'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<FlowList />', () => {
  it('should render nothing', () => {
    const sut = shallow(<FlowList />)
    expect(sut).to.be.empty
  })


  describe('when given a list of flows as prop', () => {
    let flows
    beforeEach('initialize flows', () => {
      flows = [
        { uuid: '1', name: 'Flow 1', type: 'octoblu:flow' },
        { uuid: '2', name: 'Flow 2', type: 'octoblu:flow' },
        { uuid: '3', name: 'Flow 3', type: 'octoblu:flow' },
        { uuid: '4', name: 'Flow 4', type: 'octoblu:flow' },
      ]
    })

    it('should render a FlowListItem for each Flows', () => {
      const sut = shallow(<FlowList flows={flows} />)
      flows.forEach((flow) => {
        expect(sut).to.contain(<FlowListItem flow={flow} onDeleteFlow={_.noop}/>)
      })
    })
  })
})
