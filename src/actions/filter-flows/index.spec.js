import { expect } from 'chai'

import filterFlow from './'

describe('Filter Flows Actions', () => {
  it('should handle filterFlow action', () => {
    const expectedAction = {
      type: filterFlow.getType(),
      payload: 'foo-bar'
    }

    expect(filterFlow('foo-bar')).to.deep.equal(expectedAction)
  })
})
