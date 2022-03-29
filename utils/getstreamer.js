const axios = require('axios');
const https = require('https');

module.exports = function getStreamer(streamer){
    const api = `https://api.twitch.tv/helix/streams/?user_login=` + streamer;
    let config = {
        headers: {
            'Client-Id': tclientkey,
            'Authorization' : authkey,
        }
    }
    return axios.get(api, config);
}