import https from 'https';
import axios from 'axios';
import {CacheType, CacheTypeReducer, Snowflake} from "discord.js";

export interface ApiRequest{
    getBlackListesWords: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    getAdminLogMessageforGuild: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    getPublicLogMessageforGuild: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    getWhitelistedWords: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    getWhitelistedClients: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
}

export const api: ApiRequest = {
    getBlackListesWords: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/spamfilter/blacklistedwords/${gid}`
        return axios.get(url)
    },
    getAdminLogMessageforGuild: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/spamfilter/messagelog/${gid}`
        return axios.get(url)
    },
    getPublicLogMessageforGuild: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/spamfilter/messagepublic/${gid}`
        return axios.get(url)
    },
    getWhitelistedWords: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/spamfilter/whitelist/words/${gid}`
        return axios.get(url)
    },
    getWhitelistedClients: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/spamfilter/whitelist/clients/${gid}`
        return axios.get(url)
    },
}

export function getBlackListesWords(gid: CacheTypeReducer<CacheType, Snowflake>): string[]{
    const words: string[] = [];
    let checkGid = "";
    api.getBlackListesWords(gid).then(async(response: any) => {
        for(const key in response.data){
            words.push(response.data[key].blacklisted)
            if (checkGid != response.data[key].gid){
                return ["ERROR"]
            } else {
                checkGid = response.data[key].gid
            }
        }
    })
    return words
}

export function getWhiteListesWords(gid: CacheTypeReducer<CacheType, Snowflake>): string[]{
    const words: string[] = [];
    let checkGid = "";
    api.getBlackListesWords(gid).then(async(response: any) => {
        for(const key in response.data){
            words.push(response.data[key].whitelisted)
            if (checkGid != response.data[key].gid){
                return ["ERROR"]
            } else {
                checkGid = response.data[key].gid
            }
        }
    })
    return words
}

export function getWhiteListesClients(gid: CacheTypeReducer<CacheType, Snowflake>, client: CacheTypeReducer<CacheType, Snowflake>): boolean{
    api.getWhitelistedClients(gid).then(async(response: any) => {
        for (const key in response.data){
            if (client == response.data[key].clientid){
                return true;
            }
        }
        return false;
    })
    return false;
}