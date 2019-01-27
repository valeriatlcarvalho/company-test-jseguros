import React from 'react'
import { shallow } from 'enzyme'
import { createRouterContext } from 'react-router-test-context'
import { Link } from 'react-router-dom'

import App from '../../containers/App'
import Button from '../../components/Button'

describe('<App />', () => {
  it('Renders', () => {
    const context = createRouterContext
    const wrapper = shallow(<App />, { context })

    expect(wrapper.find(Button).exists()).toBe(false)
    expect(wrapper.find(Link).exists()).toBe(true)
  })
})