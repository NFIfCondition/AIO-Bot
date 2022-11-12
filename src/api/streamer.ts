import https from 'https';
import axios from 'axios';
import {CacheType, CacheTypeReducer, Snowflake} from "discord.js";

export interface Streamer{
    getStreamer: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
}

export const streamer: Streamer = {
    getStreamer: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/streamer/${gid}`
        return axios.get(url)
    },
}

export function getStreamer(gid: CacheTypeReducer<CacheType, Snowflake>): string[]{
    const streamername: string[] = [];
    streamer.getStreamer(gid).then(async(response: any) => {
        for(const key in response.data){
            streamername.push(response.data[key].streamername)
        }
    })
    return streamername
}