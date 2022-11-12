import https from 'https';
import axios from 'axios';
import {CacheType, CacheTypeReducer, Snowflake} from "discord.js";

import {
    ReturnTypes
} from "./../index"

export interface AioFilter {
    getWords: () => Promise<string>,
    getClients: (gid: CacheTypeReducer<CacheType, Snowflake>, clientid: CacheTypeReducer<CacheType, Snowflake>) => Promise<string>
}

export const aioFilter: AioFilter = {
    getWords: function () {
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/aiospamfilter/request/words`
        return axios.get(url)
    },
    getClients: function (gid: CacheTypeReducer<CacheType, Snowflake>, clientid: CacheTypeReducer<CacheType, Snowflake>) {
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/aiospamfilter/request/clients/${clientid}`
        return axios.get(url)
    }
}

export function containsClientInAIOFilter(gid: CacheTypeReducer<CacheType, Snowflake>, clientid: CacheTypeReducer<CacheType, Snowflake>): ReturnTypes {
    aioFilter.getClients(gid, clientid).then(async (response: any) => {
            for (const key in response.data) {
                if (response.data[key].clientag == clientid) {
                    return ReturnTypes.TRUE;
                }
            }
            return ReturnTypes.FALSE;
        }
    )
    return ReturnTypes.WAITING;
}

export function containsWord(word: string): ReturnTypes {
    aioFilter.getWords().then(async (response: any) => {
            for (const key in response.data) {
                if (response.data[key].words == word) {
                    return ReturnTypes.TRUE;
                }
            }
            return ReturnTypes.FALSE;
        }
    )
    return ReturnTypes.WAITING;
}

