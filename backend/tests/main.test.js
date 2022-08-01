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

const sendNoCookieAuthRequest = async () => {
  const response = await fetch('http://127.0.0.1:3030/api/auth', {
      method: 'POST',
      credentials: 'include',
  });
  const data = await response.json();
  return data;
}

const sendBookFetchNoCookie = async () => {
  const response = await fetch('http://127.0.0.1:3030/api/get_library_books', {
      method: 'get',
      credentials: 'include',
  });
  const data = await response.json();
  return data;
}

const sendProfileFetchNoCookie = async (username) => {
  const response = await fetch(`http://127.0.0.1:3030/api/user/${username}`, {
      method: 'get',
      credentials: 'include',
  });
  const data = await response.json();
  return data;
}

const sendProfileFetchCookie = async (username) => {
  const response = await fetch(`http://127.0.0.1:3030/api/user/${username}`, {
      method: 'get',
      credentials: 'include',
      headers: {
        cookie: testJwt
      }
  });
  const data = await response.json();
  return data;
}


const sendAdminFetchNoPermissions = async () => {
  const response = await fetch(`http://127.0.0.1:3030/api/get_users`, {
      method: 'get',
      credentials: 'include',
      headers: {
        cookie: testJwt
      }
  });
  const data = await response.json();
  return data;
}


const sendBookChangeCover = async () => {
  const response = await fetch(`http://127.0.0.1:3030/api/change_cover_by_slug`, {
      method: 'post',
      credentials: 'include',
      headers: {
        cookie: testJwt
      }
  });
  const data = await response.json();
  return data;
}

const sendBookChangeCoverNoCookie = async () => {
  const response = await fetch(`http://127.0.0.1:3030/api/change_cover_by_slug`, {
      method: 'post',
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
      assert.equal(data["message"],"Успешно!");
    });
})

describe('Cookie test', async function () {
  it('Check auth method with work cookie', async () => {
    const data = await sendAuthRequest();
    assert.ok(data['auth_data']);
  });
  it('Try auth without the use of cookies', async () => {
    const data = await sendNoCookieAuthRequest();
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
  it('Search book by slug - invalid data 3', async () => {
    const data = await sendBookSearchRequest("rekgoergk");
    assert.deepEqual(data, []);
  });
  it('Change book cover by slug(no permissions)', async () => {
    const data = await sendBookChangeCover();
    assert.equal(data["message"],"Для этого метода нужно быть администратором");
  });
  it('Change book cover by slug(no cookie)', async () => {
    const data = await sendBookChangeCoverNoCookie();
    assert.equal(data["message"],"Для этого метода нужна авторизация");
  });
})

describe('Profile test', async function () {
  it('get data user by username(no cookie)', async () => {
    const data = await sendProfileFetchNoCookie("MindBreaker");
    assert.equal(data["message"],"Для этого метода нужна авторизация");
  });
  it('get data user by username', async () => {
    const data = await sendProfileFetchCookie("MindBreaker");
    assert.ok(data);
  });
  it('get the data of a non-existing user', async () => {
    const data = await sendProfileFetchCookie("NotExistUser");
    assert.deepStrictEqual(data, []);
  });
})

describe('AdminPanel test', async function () {
  it('get admin data but,don"t have permissions', async () => {
    const data = await sendAdminFetchNoPermissions();
    assert.equal(data["message"],"Для этого метода нужно быть администратором");
  });
})

