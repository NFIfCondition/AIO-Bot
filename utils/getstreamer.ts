import {
    
} from './../index'

import axios from "axios";

const tokens = " " //require('./tokens.js')
const client = tokens //.tclientkey
const auth = tokens//.authkey

export interface GetStreamerInfos{
    getStreamer: (streamer: string) => Promise<string>,
    getStreamerbyId: (id: number) => Promise<string>,
}

export const getStreamers: GetStreamerInfos = {
    getStreamer : function(streamer: string){
        const api = `https://api.twitch.tv/helix/streams/?user_login=` + streamer;
        const config = {
            headers: {
                'Client-Id': client,
                'Authorization' : auth,
            }
        }
        return axios.get(api, config);
    },
    getStreamerbyId : function(id: number){
        const api = 'https://api.twitch.tv/helix/users/?id=' + id ;
        const config = {
            headers: {
                'Client-Id': client,
                'Authorization' : auth,
            }
        }
        return axios.get(api, config);
    }
}