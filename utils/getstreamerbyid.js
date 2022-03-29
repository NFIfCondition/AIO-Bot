const axios = require('axios');
const https = require('https');

module.exports = function getStreamerbyid(id){
    const api = 'https://api.twitch.tv/helix/users/?id=' + id ;
    let config = {
        headers: {
            'Client-Id': tclientkey,
            'Authorization' : authkey,
        }
    }
    return axios.get(api, config);
}