import TOKEN_KEY from './TOKEN_KEY'

it('matches snapshot', () => {
  expect(TOKEN_KEY).toMatchSnapshot()
})
