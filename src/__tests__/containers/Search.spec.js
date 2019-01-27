import React from 'react'
import { mount, shallow } from 'enzyme'
import moxios from 'moxios'

import { IoMdTrendingUp, IoIosCheckmarkCircle, IoIosCloseCircle, IoIosSearch } from 'react-icons/io'

import { findCnpjCompany } from '../../service/search-cnpj'
import Search from '../../containers/Search'
import Button from '../../components/Button'

describe('<Search />', () => {
  it('Renders', () => {
    const wrapper = shallow(<Search />)
    expect(wrapper.find(Button, IoMdTrendingUp, IoIosSearch).exists()).toBe(true)
  })

  it('Input empty on render', () => {
    const wrapper = shallow(<Search />)
    expect(wrapper.find('#input-cnpj').text()).toBe('')
  })

  it('Input on change', () => {
    const wrapper = shallow(<Search />)
    const event = { target: { value: '12345678000123' } }
    jest.spyOn(wrapper.instance(), 'changeHandler')
    wrapper.find('#input-cnpj').simulate('change', event)
    expect(wrapper.state().cnpj).toBe('12.345.678/0001-23')
  })

  it('Submit form', () => {
    const wrapper = shallow(<Search />)
    const event = { target: { value: '12345678000123' } }
    jest.spyOn(wrapper.instance(), 'changeHandler')
    wrapper.find('#input-cnpj').simulate('change', event)
    expect(wrapper.state().cnpj).toBe('12.345.678/0001-23')

    const eventForm = { preventDefault: jest.fn() }
    jest.spyOn(wrapper.instance(), 'submitHandler')
    wrapper.find('form').simulate('submit', eventForm)
    expect(wrapper.find('form').props().onSubmit).toBeDefined()
    expect(eventForm.preventDefault).toBeCalled()
  })
})

describe('Service', () => {
  beforeEach(() => moxios.install())

  afterEach(() => moxios.uninstall())

  it('mocking axios requests - status 200', () => {
    const wrapper = shallow(<Search />)
    const event = { target: { value: '12345678000123' } }
    jest.spyOn(wrapper.instance(), 'changeHandler')
    wrapper.find('#input-cnpj').simulate('change', event)

    const eventForm = { preventDefault: jest.fn() }
    jest.spyOn(wrapper.instance(), 'submitHandler')
    wrapper.find('form').simulate('submit', eventForm)
    wrapper.instance().submitHandler(eventForm)

    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        statusText: 'OK',
        data: {
          message: 'OK'
        }
      })
    })

    expect(wrapper.find(IoIosCheckmarkCircle).exists()).toBe(true)
    // const resp = { status: 200, statusText: 'OK' }
    // const resp = { status: 404, statusText: 'Not Found' }
  })
})