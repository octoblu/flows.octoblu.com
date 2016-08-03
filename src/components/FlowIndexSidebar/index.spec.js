import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'

import FlowIndexSidebar from './'
import styles from './styles.css'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<FlowIndexSidebar />', () => {
  it('should set filtering prop to false by default', () => {
    const sut = mount(<FlowIndexSidebar />)
    expect(sut).to.have.prop('filteringFlows', false)
  })

  describe('when filteringFlows prop is truthy', () => {
    const sut = mount(<FlowIndexSidebar filteringFlows />)
    const allFlowsFilterLink = sut.find('[name="allFlowsFilter"]')

    it('should not have a activeFilter className', () => {
      expect(allFlowsFilterLink).to.not.have.className(styles.activeFilter)
    })
  })

  describe('when filteringFlows prop is falsy', () => {
    const sut = mount(<FlowIndexSidebar />)
    const allFlowsFilterLink = sut.find('[name="allFlowsFilter"]')

    it('should have a activeFilter className', () => {
      expect(allFlowsFilterLink).to.have.className(styles.activeFilter)
    })
  })
})
