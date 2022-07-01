const assert = require('assert');
const fetch = require('node-fetch');

const sendAuthRequest = async () => {
    const response = await fetch('http://127.0.0.1:3030/api/login/', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            username:"SPD",
            password:"testpassword"
        }),
      })
  
    const data = await response.json()
  
    return data
}

const sendCheckAuthRequest = async () => {
  const response = await fetch('http://127.0.0.1:3030/api/auth', {
    method: 'POST',
    credentials: "same-origin"
  })
  const data = await response.text()
  
  return data
}


describe('Auth', async function () {
  describe('login user', async function () {
    it('Simple test for auth application', async function () {
      const data = await sendAuthRequest();
      assert.equal(data["message"],'Success!');
    });
  });
});

describe('Auth', async function () {
  describe('login user', async function () {
    it('Simple test for auth application', async function () {
      const data = await sendAuthRequest();
      assert.equal(data["message"],'Success!');
    });
  });
});

