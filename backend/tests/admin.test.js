/* eslint-disable no-undef */
const assert = require('assert')
const fetch = require('node-fetch')
const { testJwt, adminJwt } = require('../config')

const deleteUserNoPermissionsFetch = async (username) => {
  const response = await fetch('http://127.0.0.1:3030/api/delete_user', {
    method: 'delete',
    credentials: 'include',
    headers: {
      cookie: testJwt
    },
    body: JSON.stringify({
      username
    })
  })
  const data = await response.json()
  return data
}

const deleteHavePermissionsFetch = async (username) => {
  const response = await fetch('http://127.0.0.1:3030/api/delete_user', {
    method: 'delete',
    credentials: 'include',
    headers: {
      cookie: adminJwt
    },
    body: JSON.stringify({
      username
    })
  })
  const data = await response.json()
  console.log(data)
  return data
}

const sendAdminFetchNoPermissions = async () => {
  const response = await fetch('http://127.0.0.1:3030/api/get_users', {
    method: 'get',
    credentials: 'include',
    headers: {
      cookie: testJwt
    }
  })
  const data = await response.json()
  return data
}

describe('AdminPanel test', async function () {
  it('get admin data but,don"t have permissions', async () => {
    const data = await sendAdminFetchNoPermissions()
    assert.equal(data.message, 'Для этого метода нужно быть администратором')
  })
  it('try delete user, don"t have permissions', async () => {
    const data = await deleteUserNoPermissionsFetch('TestUser')
    assert.equal(data.message, 'Для этого метода нужно быть администратором')
  })
  it('delete TestUser', async () => {
    const data = await deleteHavePermissionsFetch('testUser')
    assert.deepStrictEqual(data.message, 'Пользователь testUser удален')
  })
})
