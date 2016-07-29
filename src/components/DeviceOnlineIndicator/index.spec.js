import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { mount, shallow } from 'enzyme'

import FaCircle from 'react-icons/lib/fa/circle'
import FaCircleHollow from 'react-icons/lib/fa/circle-o'

import DeviceOnlineIndicator from './'
import styles from './styles.css'

chai.use(chaiEnzyme())
chai.use(sinonChai)

describe('<DeviceOnlineIndicator />', () => {
  describe('when online prop is truthy', () => {
    let sut

    beforeEach(() => {
      sut = shallow(<DeviceOnlineIndicator online />)
    })

    it('should render the online status label', () => {
      expect(sut).to.contain('Online')
    })

    it('should render an online icon', () => {
      expect(sut).to.contain(<FaCircle className={styles.onlineIcon}/>)
    })
  })

  describe('when online prop is falsy', () => {
    let sut

    beforeEach(() => {
      sut = shallow(<DeviceOnlineIndicator />)
    })

    it('should render the online status label', () => {
      expect(sut).to.contain('Offline')
    })

    it('should render an offline icon', () => {
      expect(sut).to.contain(<FaCircleHollow className={styles.icon}/>)
    })

  })
})
