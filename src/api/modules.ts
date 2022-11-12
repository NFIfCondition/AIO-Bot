import https from 'https';
import axios from 'axios';
import {CacheType, CacheTypeReducer, Snowflake} from "discord.js";

import {ReturnTypes} from "./../index"

export interface Modules{
    getActiveModules: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
}

export const modules: Modules = {
    getActiveModules: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/modules/${gid}`
        return axios.get(url)
    },
}

export function ModuleActive(gid: CacheTypeReducer<CacheType, Snowflake>, module: number): ReturnTypes{
    modules.getActiveModules(gid).then(async(response: any) => {
            for (const key in response.data) {
                if (response.data[key].mid == module) {
                    console.log("HS")
                    return ReturnTypes.TRUE
                }
            }
            return ReturnTypes.FALSE;
        }
    )
    return ReturnTypes.WAITING;
}
