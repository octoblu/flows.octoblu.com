import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import Button from 'zooid-button'

import styles from './styles.css'

import FlowMenu from './'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<FlowMenu />', () => {
  describe('when visible prop is truthy', () => {
    let sut

    beforeEach(() => {
      sut = shallow(
        <FlowMenu visible>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </FlowMenu>
      )
    })

    it('should render', () => {
      expect(sut).to.not.be.empty
    })

    it('should render children', () => {
      expect(sut).to.contain(<Button>One</Button>)
      expect(sut).to.contain(<Button>Two</Button>)
      expect(sut).to.contain(<Button>Three</Button>)
    })
  })

  describe('when visible prop is falsy', () => {
    it('should NOT render', () => {
      const sut = shallow(
        <FlowMenu>
          <Button>One</Button>
        </FlowMenu>
      )

      expect(sut).to.be.empty
    })
  })
})
