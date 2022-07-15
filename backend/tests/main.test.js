const assert = require('assert');
const fetch = require('node-fetch');
const { testJwt,loginUser,passwordUser } = require('../config');

const sendLoginRequest = async (usernameValue,passwordValue) => {
    const response = await fetch('http://127.0.0.1:3030/api/login/', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
            username:usernameValue,
            password:passwordValue
        }),
    })
    const data = await response.json();
    return data;
}

const sendRegistrationsRequest = async () => {
  const response = await fetch('http://127.0.0.1:3030/api/register', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        username:"testUser",
        password:"testPassword",
        email:"test@mail.ru"
      }),
  });

  const data = await response.json();
  return data;
}

const sendBookSearchRequest = async (textQuery) => {
  const response = await fetch('http://127.0.0.1:3030/api/search_books', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        text:textQuery
      }),
  });
  const data = await response.json();
  return data;
}

const sendAuthRequest = async () => {
  const response = await fetch('http://127.0.0.1:3030/api/auth', {
      method: 'POST',
      credentials: 'include',
      headers: {
        cookie: testJwt
      }
  });
  const data = await response.json();
  return data;
}

const sendBrokenAuthRequest = async () => {
  const response = await fetch('http://127.0.0.1:3030/api/auth', {
      method: 'POST',
      credentials: 'include',
  });
  const data = await response.json();
  return data;
}


describe('Register test', async function () {
    it('Simple test for check registrations', async () => {
      const data = await sendRegistrationsRequest();
      assert.equal(data, "Успешно!");
    });
})


describe('Login test', async function () {
    it('Send invalid data', async () => {
      const data = await sendLoginRequest("1", "1");
      assert.equal(data["message"],"Неверные данные!");
    });
    it('Send valid data,but email not confirmed', async () => {
      const data = await sendLoginRequest("testUser", "testPassword");
      assert.equal(data["message"],"Активируйте почту!");
    });
    it('Send valid data and email confirmed', async () => {
      const data = await sendLoginRequest(loginUser, passwordUser);
      assert.equal(data["message"],"Авторизация успешна!");
    });
})

describe('Auth test', async function () {
  it('Check auth method with work cookie', async () => {
    const data = await sendAuthRequest();
    assert.ok(data['auth_data']);
  });
  it('Try auth without the use of cookies', async () => {
    const data = await sendBrokenAuthRequest();
    assert.equal(data["message"],"Для этого метода нужна авторизация");
  });
})


describe('Book test', async function () {
  it('Search book by slug - valid data', async () => {
    const data = await sendBookSearchRequest("Этика");
    assert.ok(data);
  });
  it('Search book by slug - valid data 2', async () => {
    const data = await sendBookSearchRequest("Государство");
    assert.ok(data);
  });
  it('Search book by slug - invalid data', async () => {
    const data = await sendBookSearchRequest("123");
    assert.deepEqual(data, []);
  });
  it('Search book by slug - invalid data 2', async () => {
    const data = await sendBookSearchRequest("456");
    assert.deepEqual(data, []);
  });
})
