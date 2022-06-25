import https from 'https';
import axios from 'axios';
import {CacheType, CacheTypeReducer, Snowflake} from "discord.js";
import { ModuleNamesToID } from './../index'

export interface ClearChat{
    getAllowedClients: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    getAllowedRoles: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    getMessage: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>
}

export const clearchat: ClearChat= {
    getAllowedClients: function(gid: CacheTypeReducer<CacheType, Snowflake>) {
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/clearchat/allowedclients/${gid}`
        return axios.get(url)
    },
    getAllowedRoles: function(gid: CacheTypeReducer<CacheType, Snowflake>) {
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/clearchat/allowedroles/${gid}`
        return axios.get(url)
    },
    getMessage: function(gid: CacheTypeReducer<CacheType, Snowflake>) {
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/clearchat/message/${gid}`
        return axios.get(url)
    }
}

export function containsClientInClearChat(gid: CacheTypeReducer<CacheType, Snowflake>, client: CacheTypeReducer<CacheType, Snowflake>): boolean{
    clearchat.getAllowedClients(gid).then(async(response: any) => {
            for (const key in response.data) {
                if (response.data[key].clientid == client) {
                    return true;
                }
            }
            return false;
        }
    )
    return false;
}

export function containsRolesInClearChat(gid: CacheTypeReducer<CacheType, Snowflake>, role: CacheTypeReducer<CacheType, Snowflake>): boolean{
    clearchat.getAllowedRoles(gid).then(async(response: any) => {
            for (const key in response.data) {
                if (response.data[key].roleid == role) {
                    return true;
                }
            }
            return false;
        }
    )
    return false;
}
