/* eslint-disable no-undef */
const assert = require('assert')
const fetch = require('node-fetch')
const { testJwt } = require('../config')

const sendProfileFetchNoCookie = async (username) => {
  const response = await fetch(`http://127.0.0.1:3030/api/user/${username}`, {
    method: 'get',
    credentials: 'include'
  })
  const data = await response.json()
  return data
}
const sendProfileFetchCookie = async (username) => {
  const response = await fetch(`http://127.0.0.1:3030/api/user/${username}`, {
    method: 'get',
    credentials: 'include',
    headers: {
      cookie: testJwt
    }
  })
  const data = await response.json()
  return data
}

describe('Profile test', async function () {
  it('get data user by username(no cookie)', async () => {
    const data = await sendProfileFetchNoCookie('MindBreaker')
    assert.equal(data.message, 'Для этого метода нужна авторизация')
  })
  it('get data user by username', async () => {
    const data = await sendProfileFetchCookie('MindBreaker')
    assert.ok(data)
  })
  it('get the data of a non-existing user', async () => {
    const data = await sendProfileFetchCookie('NotExistUser')
    assert.deepStrictEqual(data, [])
  })
})
