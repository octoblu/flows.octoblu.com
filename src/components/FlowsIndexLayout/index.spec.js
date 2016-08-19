import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'

import FlowsIndexLayout from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<FlowsIndexLayout />', () => {
  it('should render children', () => {
    const sut = shallow(<FlowsIndexLayout><p>Kids</p></FlowsIndexLayout>)
    expect(sut).to.contain(<p>Kids</p>)
  })
})
