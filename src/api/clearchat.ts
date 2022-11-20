import https from 'https';
import axios from 'axios';
import {CacheType, CacheTypeReducer, GuildMemberRoleManager, Snowflake} from "discord.js";

import {ReturnTypes} from "./../index"

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

export function ContainsClientInClearChat(gid: CacheTypeReducer<CacheType, Snowflake>, client: CacheTypeReducer<CacheType, Snowflake>): ReturnTypes{
    clearchat.getAllowedClients(gid).then(async(response: any) => {
            for (const key in response.data) {
                if (response.data[key].clientid == client) {
                    return ReturnTypes.TRUE;
                }
            }
            return ReturnTypes.FALSE;
        }
    )
    return ReturnTypes.WAITING;
}

export function ContainsRolesInClearChat(gid: CacheTypeReducer<CacheType, Snowflake>, role: GuildMemberRoleManager): ReturnTypes{
    clearchat.getAllowedRoles(gid).then(async(response: any) => {
            for (const key in response.data) {
                if (response.data[key].roleid == role) {
                    return ReturnTypes.TRUE;
                }
            }
            return ReturnTypes.FALSE;
        }
    )
    return ReturnTypes.WAITING;
}

