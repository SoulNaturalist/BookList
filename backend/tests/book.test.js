/* eslint-disable no-undef */
const assert = require('assert')
const fetch = require('node-fetch')
const { testJwt } = require('../config')

const sendBookSearchRequest = async (textQuery) => {
  const response = await fetch('http://127.0.0.1:3030/api/search_books', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      text: textQuery
    })
  })
  const data = await response.json()
  return data
}

const sendBookChangeCover = async () => {
  const response = await fetch('http://127.0.0.1:3030/api/change_cover_by_slug', {
    method: 'post',
    credentials: 'include',
    headers: {
      cookie: testJwt
    }
  })
  const data = await response.json()
  return data
}

const sendBookChangeCoverNoCookie = async () => {
  const response = await fetch('http://127.0.0.1:3030/api/change_cover_by_slug', {
    method: 'post',
    credentials: 'include'
  })
  const data = await response.json()
  return data
}

describe('Book test', async function () {
  it('Search book by slug - valid data', async () => {
    const data = await sendBookSearchRequest('Этика')
    assert.ok(data)
  })
  it('Search book by slug - valid data 2', async () => {
    const data = await sendBookSearchRequest('Государство')
    assert.ok(data)
  })
  it('Search book by slug - invalid data', async () => {
    const data = await sendBookSearchRequest('123')
    assert.deepEqual(data, [])
  })
  it('Search book by slug - invalid data 2', async () => {
    const data = await sendBookSearchRequest('456')
    assert.deepEqual(data, [])
  })
  it('Search book by slug - invalid data 3', async () => {
    const data = await sendBookSearchRequest('rekgoergk')
    assert.deepEqual(data, [])
  })
  it('Change book cover by slug(no permissions)', async () => {
    const data = await sendBookChangeCover()
    assert.equal(data.message, 'Для этого метода нужно быть администратором')
  })
  it('Change book cover by slug(no cookie)', async () => {
    const data = await sendBookChangeCoverNoCookie()
    assert.equal(data.message, 'Для этого метода нужна авторизация')
  })
})
