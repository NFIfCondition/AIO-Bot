import https from 'https';
import axios from 'axios';
import {CacheType, CacheTypeReducer, Snowflake} from "discord.js";

export interface ApiRequest{
    getModule: (gid: string, module: string)=> Promise<string>,
    updateModule: (module: number, objName: object, option: string)=> Promise<string>
    getModules: (gid: CacheTypeReducer<CacheType, Snowflake>) => Promise<string>
    postNewBotCount: (bots: number) => Promise<number>
}

//interface moduleObject{
//}

export const api: ApiRequest = {
    getModules: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/guild/moduled/${gid}`
        return axios.get(url)
    },
    getModule : function(gid: string, module: string){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/guild/${gid}/module/${module}`
        return axios.get(url)
    },
    updateModule : function(module: number, objName: object, option: string){
        https.globalAgent.options.rejectUnauthorized = false;
        return axios.post(`https://api-ionic-host.de/${module}/${option}`, objName)
    },
    postNewBotCount : function(bots_: number){
        https.globalAgent.options.rejectUnauthorized = false;
        return axios.post(`https://api.ionic-host.de/websitestats`, {bots:bots_})
    }
}

export function ModuleActive(gid: CacheTypeReducer<CacheType, Snowflake>, module: number): boolean{
    api.getModules(gid).then(async(response: any) => {
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
