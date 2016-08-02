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
  })
})
