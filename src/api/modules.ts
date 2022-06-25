import https from 'https';
import axios from 'axios';
import {CacheType, CacheTypeReducer, Snowflake} from "discord.js";

export interface Modules{
    getActiveModules: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
}

export const modules: Modules = {
    getActiveModules: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/guild/moduled/${gid}`
        return axios.get(url)
    },
}

export function ModuleActive(gid: CacheTypeReducer<CacheType, Snowflake>, module: number): boolean{
    modules.getActiveModules(gid).then(async(response: any) => {
            for (const key in response.data) {
                if (response.data[key].mid == module) {
                    return true;
                }
            }
            return false;
        }
    )
    return false;
}
