import React from 'react'
import { shallow } from 'enzyme'

import Button from '../../components/Button'
import { IoIosArrowRoundForward } from 'react-icons/io'

describe('<Button />', () => {
  it('Renders', () => {
    const wrapper = shallow(<Button label="Continue" />)
    expect(wrapper.find(IoIosArrowRoundForward).exists()).toBe(true)
  })
})
