import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'

import FlowItemMain from './'
import FlowTags from '../FlowTags'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<FlowItemMain />', () => {
  describe('when draft is empty', () => {
    it('should not render nothing', () => {
      const sut = shallow(<FlowItemMain draft={{uuid: 'flow-007'}}/>)
      expect(sut).to.be.empty
    })
  })

  describe('when draft has nodes & description property', () => {
    let draft

    beforeEach(() => {
      draft = {
        description: 'lorem description',
        nodes: [
          {type:'gateblu'}
        ]
      }
    })

    it('should render tags for each node', () => {
      const sut = shallow(<FlowItemMain draft={draft}/>)
      expect(sut).to.contain(<FlowTags nodes={draft.nodes} />)
    })

    it('should render description ', () => {
      const sut = shallow(<FlowItemMain draft={draft}/>)
      expect(sut).to.contain(<div name="description">lorem description</div>)
    })
  })
})
