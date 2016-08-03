import _ from 'lodash'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'

import FlowIndexHeader from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<FlowIndexHeader />', () => {
  describe('when onCreateFlow is not passed in', () => {
    it('should default onCreateFlow', () => {
      const sut = mount(<FlowIndexHeader />)
      expect(sut).to.have.prop('onCreateFlow', _.noop)
    })

    it('should default creatingFlow to false', () => {
      const sut = mount(<FlowIndexHeader />)
      expect(sut).to.have.prop('creatingFlow', false)
    })
  })

  describe('when onCreateFlow is passed in', () => {

    describe('when New Flow button is clicked', () => {
      it('should call onCreateFlow', () => {
        const handleCreateFlow = sinon.spy()
        const sut              = mount(<FlowIndexHeader onCreateFlow={handleCreateFlow}/>)
        const createFlowButton = sut.find('[name="createFlow"]')

        createFlowButton.simulate('click')

        expect(handleCreateFlow).to.have.been.called
      })
    })

    describe('when creatingFlow prop is truthy', () => {
      it('should render a creating text in the New Flow button', () => {
        const handleCreateFlow = sinon.spy()
        const sut              = mount(<FlowIndexHeader onCreateFlow={handleCreateFlow} creatingFlow />)
        const createFlowButton = sut.find('[name="createFlow"]')

        expect(createFlowButton).to.contain.text('Creating...')
      })

      it('should render disable the New Flow button', () => {
        const handleCreateFlow = sinon.spy()
        const sut              = mount(<FlowIndexHeader onCreateFlow={handleCreateFlow} creatingFlow />)
        const createFlowButton = sut.find('[name="createFlow"]')

        expect(createFlowButton).to.have.prop('disabled', true)
      })
    })
  })
})
