import https from 'https';
import axios from 'axios';
import {CacheType, CacheTypeReducer, Snowflake} from "discord.js";

import {
    ReturnTypes
} from "./../index"

export interface Commands{
    getActiveCommands: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
}

export const command: Commands = {
    getActiveCommands: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/guildcommands/${gid}`
        return axios.get(url)
    },
}

export function activeCommands(gid: CacheTypeReducer<CacheType, Snowflake>, commandid: number): ReturnTypes{
    command.getActiveCommands(gid).then(async(response: any) => {
            for (const key in response.data) {
                if (response.data[key].mid == commandid) {
                    return ReturnTypes.TRUE;
                }
            }
            return ReturnTypes.FALSE;
        }
    )
    return ReturnTypes.WAITING;
}
