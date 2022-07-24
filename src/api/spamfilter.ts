import https from 'https';
import axios from 'axios';
import {CacheType, CacheTypeReducer, Snowflake} from "discord.js";

export interface SpamFilter{
    getBlackListedWords: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    getAdminLogMessageForGuild: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    getPublicLogMessageForGuild: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    getWhitelistedWords: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    getWhitelistedClients: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    getSpamrate: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<number> | undefined,
}

export const spamfilter: SpamFilter = {
    getBlackListedWords: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/spamfilter/blacklistedwords/${gid}`
        return axios.get(url)
    },
    getAdminLogMessageForGuild: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/spamfilter/messagelog/${gid}`
        return axios.get(url)
    },
    getPublicLogMessageForGuild: function(gid: CacheTypeReducer<CacheType, Snowflake>){
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
    getSpamrate: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        //TODO change URL Endpoint to the API SERVER
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/spamfilter/whitelist/clients/${gid}`
        const obj = axios.get(url)
        obj.then(async (response: any) =>{
            return response.data[0].spamrate
        })
        return undefined
    },
}

export function getBlackListesWords(gid: CacheTypeReducer<CacheType, Snowflake>): string[]{
    const words: string[] = [];
    let checkGid = "";
    spamfilter.getBlackListedWords(gid).then(async(response: any) => {
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

export function getWhiteListesWordsFromSpamFilter(gid: CacheTypeReducer<CacheType, Snowflake>): string[]{
    const words: string[] = [];
    let checkGid = "";
    spamfilter.getBlackListedWords(gid).then(async(response: any) => {
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

export function getWhiteListesClientsFromSpamFilter(gid: CacheTypeReducer<CacheType, Snowflake>, client: CacheTypeReducer<CacheType, Snowflake>): boolean{
    spamfilter.getWhitelistedClients(gid).then(async(response: any) => {
        for (const key in response.data){
            if (client == response.data[key].clientid){
                return true;
            }
        }
        return false;
    })
    return false;
}