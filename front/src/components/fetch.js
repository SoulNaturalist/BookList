const axios = require('axios');

async function fetcher() {
    const res = await axios({method: 'post',url:'http://127.0.0.1:3030/api/auth',withCredentials: true, headers: {}})
    return res
}
module.exports = fetcher;