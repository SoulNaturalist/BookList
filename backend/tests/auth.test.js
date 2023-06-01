/* eslint-disable no-undef */
const assert = require('assert')
const fetch = require('node-fetch')
const { testJwt, loginUser, passwordUser, adminJwt } = require('../config')

const sendLoginRequest = async (usernameValue, passwordValue) => {
  const response = await fetch('http://127.0.0.1:3030/api/login/', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      username: usernameValue,
      password: passwordValue
    })
  })
  const data = await response.json()
  return data
}

const sendRegistrationRequest = async () => {
  const response = await fetch('http://127.0.0.1:3030/api/register', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      username: 'testUser',
      password: 'testPassword',
      email: 'test@mail.ru'
    })
  })

  const data = await response.json()
  return data
}

const sendRegistrationBrokenRequest = async () => {
  const response = await fetch('http://127.0.0.1:3030/api/register', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      username: 'Santipic',
      password: 'SantipicPass',
      email: 'xafire7928@logodez.com'
    })
  })

  const data = await response.json()
  return data
}

const sendAuthRequest = async () => {
  const response = await fetch('http://127.0.0.1:3030/api/auth', {
    method: 'POST',
    credentials: 'include',
    headers: {
      cookie: testJwt
    }
  })
  const data = await response.json()
  return data
}

const sendNoCookieAuthRequest = async () => {
  const response = await fetch('http://127.0.0.1:3030/api/auth', {
    method: 'POST',
    credentials: 'include'
  })
  const data = await response.json()
  return data
}

describe('Register test', async function () {
  it('Simple test for check registration', async () => {
    await fetch('http://127.0.0.1:3030/api/delete_user', {
      method: 'delete',
      credentials: 'include',
      headers: {
        cookie: adminJwt
      },
      body: JSON.stringify({
        username: 'testUser'
      })
    })
    const data = await sendRegistrationRequest()
    assert.equal(data, 'Успешно!')
  })
  it('Simple test for check registration, but email invalid', async () => {
    const data = await sendRegistrationBrokenRequest()
    assert.equal(data.message, 'Ваша почта не входит в список разрешенных!')
  })
})

describe('Login test', async function () {
  it('Send invalid data', async () => {
    const data = await sendLoginRequest('1', '1')
    assert.equal(data.message, 'Неверные данные!')
  })
  it('Send valid data,but email not confirmed', async () => {
    const data = await sendLoginRequest('testUser', 'testPassword')
    assert.equal(data.message, 'Активируйте почту!')
  })
  it('Send valid data and email confirmed', async () => {
    const data = await sendLoginRequest(loginUser, passwordUser)
    assert.equal(data.message, 'Успешно!')
  })
})

describe('Cookie test', async function () {
  it('Check auth method with work cookie', async () => {
    const data = await sendAuthRequest()
    assert.ok(data.auth_data)
  })
  it('Try auth without the use of cookies', async () => {
    const data = await sendNoCookieAuthRequest()
    assert.equal(data.message, 'Для этого метода нужна авторизация')
  })
})
