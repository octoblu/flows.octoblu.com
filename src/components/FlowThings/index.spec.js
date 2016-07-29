import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'

import FlowThings from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<FlowThings />', () => {
  it('should render nothing', () => {
    const sut = shallow(<FlowThings />)
    expect(sut).to.be.empty
  })
})
