import React from 'react'
import { shallow } from 'enzyme'
import { IoMdTrendingUp, IoIosCheckmarkCircle, IoIosCloseCircle, IoIosSearch } from 'react-icons/io'
import axios from 'axios'
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

describe('Requests', () => {
  it('Request Success', () => {
    const wrapper = shallow(<Search />)
    const event = { target: { value: '12345678000123' } }
    jest.spyOn(wrapper.instance(), 'changeHandler')
    wrapper.find('#input-cnpj').simulate('change', event)

    const eventForm = { preventDefault: jest.fn() }
    wrapper.instance().submitHandler(eventForm)
    expect(wrapper.state().cnpj).toBe('12.345.678/0001-23')


    expect(wrapper.state().status).toBe('')
    expect(wrapper.state().statusClass).toBe('')

    axios.get(`/quote/12345678000123`, {
      header: { 'Content-Type': 'application/json', 'ACCESS-TOKEN': '23456789' }
    }).then(data => {
      expect(wrapper.state().status).toBe(200)
      expect(wrapper.state().statusClass).toBe('container-search__search-status--success')
    })

    wrapper.update()
    expect(wrapper.state().status).toBe('')
    expect(wrapper.state().statusClass).toBe('')
  })

  it('Request Fail', () => {
    const wrapper = shallow(<Search />)
    const eventForm = { preventDefault: jest.fn() }
    wrapper.instance().submitHandler(eventForm)

    expect(wrapper.state().status).toBe('')
    expect(wrapper.state().statusClass).toBe('')

    axios.get(`/quote/12345678000123`, {
      header: { 'Content-Type': 'application/json', 'ACCESS-TOKEN': '23456789' }
    }).then(data => {
      expect(wrapper.state().status).toBe(200)
      expect(wrapper.state().statusClass).toBe('container-search__search-status--success')
    }).catch(data => {
      expect(wrapper.state().status).toBe(404)
      expect(wrapper.state().statusClass).toBe('container-search__search-status--fail')
    })

    wrapper.update()
    expect(wrapper.state().status).toBe('')
    expect(wrapper.state().statusClass).toBe('')
  })

  it('`maskCnpj` cnpj invalid', () => {
    const wrapper = shallow(<Search />)
    expect(wrapper.instance().maskCnpj('46545664')).toBe('46545664')
  })

  it('`maskCnpj` cnpj valid', () => {
    const wrapper = shallow(<Search />)
    expect(wrapper.instance().maskCnpj('12345678000123')).toBe('12.345.678/0001-23')
  })

  it('`removeMask` cnpj valid', () => {
    const wrapper = shallow(<Search />)
    expect(wrapper.instance().removeMask('12.345.678/0001-23')).toBe('12345678000123')
  })

  it('`removeMask` cnpj invalid', () => {
    const wrapper = shallow(<Search />)
    expect(wrapper.instance().removeMask('teste*')).toBe('teste*')
  })
})