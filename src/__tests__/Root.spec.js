import React from 'react'
import { mount } from 'enzyme'

import Root from '../Root'
import App from '../containers/App'

describe('<Root />', () => {
  it('Renders', () => {
    const wrapper = mount(<Root />)

    expect(wrapper.find(App).exists()).toBe(true)
  })
})