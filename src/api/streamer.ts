import https from 'https';
import axios from 'axios';
import {CacheType, CacheTypeReducer, Snowflake} from "discord.js";

export interface ApiRequest{
    getStreamer: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
}

export const api: ApiRequest = {
    getStreamer: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/streamer/${gid}`
        return axios.get(url)
    },
}

export function getBlackListesWords(gid: CacheTypeReducer<CacheType, Snowflake>): string[]{
    const streamer: string[] = [];
    api.getStreamer(gid).then(async(response: any) => {
        for(const key in response.data){
            streamer.push(response.data[key].streamername)
        }
    })
    return streamer
}