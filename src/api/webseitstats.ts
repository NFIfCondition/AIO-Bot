import https from 'https';
import axios from 'axios';
import {CacheType, CacheTypeReducer, Snowflake} from "discord.js";

export interface ApiRequest{
    setWebstats: (gid: CacheTypeReducer<CacheType, Snowflake>, bots: number)=> Promise<string>,
}

export const api: ApiRequest = {
    setWebstats: function(gid: CacheTypeReducer<CacheType, Snowflake>, bots: number){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/streamer/${gid}`
        return axios.post(url, bots)
    },
}