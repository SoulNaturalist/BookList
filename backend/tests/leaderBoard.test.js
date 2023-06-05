/* eslint-disable no-undef */
const assert = require('assert')
const fetch = require('node-fetch')

const sendRequestLeaderBoard = async () => {
  const response = await fetch('http://127.0.0.1:3030/api/get_leaders', {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify({
      type_leaders: 'books'
    })
  })
  const data = await response.json()
  return data
}

describe('LeaderBoard testcase', async function () {
  it('LeaderBoard not empty', async () => {
    const data = await sendRequestLeaderBoard()
    assert.ok(data)
  })
})
