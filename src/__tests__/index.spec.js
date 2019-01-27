import Index from '../index'

it('Renders', () => {
  expect(JSON.stringify(
      Object.assign({}, Index, { _reactInternalInstance: 'censored' }),
    )
  ).toMatchSnapshot()
})