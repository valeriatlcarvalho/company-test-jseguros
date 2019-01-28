import sinon from 'sinon'
import { isArray } from 'util';

const server = sinon.fakeServer.create()

const serverResponses = {
  '/quote/12345678000123': { message: 'Company Found' }
}

const getNextResponse = (url => {
  const response = serverResponses[url];
  if (!response) return null

  return response
})

server.respondWith(xhr => {
  const response = getNextResponse(xhr.url)

  if (!response) {
    console.info({status: 404})
    xhr.respond(
      404,
      {
        'Content-Type': 'application/json',
        'ACCESS-TOKEN': '23456789'
      },
      JSON.stringify([{ message: 'Company Not Found' }])
    )
  } else {
    console.info({ status: 200 })
    xhr.respond(
      200,
      {
        'Content-Type': 'application/json',
        'ACCESS-TOKEN': '23456789'
      },
      JSON.stringify([response])
    )
  }
})

server.autoRespond = true

export default server