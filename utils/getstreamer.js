const axios = require('axios');
const tokens = require('./tokens.js')

const client = tokens.tclientkey
const auth = tokens.authkey

module.exports = {
    getStreamer : function(streamer){
        const api = `https://api.twitch.tv/helix/streams/?user_login=` + streamer;
        let config = {
            headers: {
                'Client-Id': client,
                'Authorization' : auth,
            }
        }
        return axios.get(api, config);
    },
    getStreamerbyid : function(id){
        const api = 'https://api.twitch.tv/helix/users/?id=' + id ;
        let config = {
            headers: {
                'Client-Id': client,
                'Authorization' : auth,
            }
        }
        return axios.get(api, config);
    }
}