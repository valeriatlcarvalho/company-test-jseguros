import axios from 'axios'
import sinon from 'sinon'
import server from '../server';

describe('Server fake', () => {
  it('request valid', () => {
    axios.get(`/quote/12345678000123`, {
      header: {
        'Content-Type': 'application/json',
        'ACCESS-TOKEN': '23456789'
      }
    }).then(data => {
      expect(global.console.info).toContains({ status: 200 })
    })
  })

  it('request invalid', () => {
    axios.get(`/quote/132`, {
      header: {
        'Content-Type': 'application/json',
        'ACCESS-TOKEN': '23456789'
      }
    }).then(data => {
      expect(global.console.info).toContains({ status: 404 })
    })
  })

  it('fakeServer test', () => {
    let fakeServer = sinon.fakeServer.create()
    fakeServer.respondWith(
      'GET', '/quote/12345678000123', JSON.stringify([{}]))

    fakeServer.respond()

    expect(axios.get('/quote/12345678000123')).toBeTruthy()

    fakeServer.restore()
  })

  it('request to server Ok', () => {
    server.respond()
    expect(axios.get('/quote/12345678000123', { header: { 'Content-Type': 'application/json', 'ACCESS-TOKEN': '23456789' } })).toBeTruthy()
  })

  it('request to server Ok with different url', () => {
    server.respond()
    expect(axios.get('/testing', { header: { 'Content-Type': 'application/json', 'ACCESS-TOKEN': '23456789' } })).toBeTruthy()
  })
})
