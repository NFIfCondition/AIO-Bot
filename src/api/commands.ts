import https from 'https';
import axios from 'axios';
import {CacheType, CacheTypeReducer, Snowflake} from "discord.js";

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

export function activeCommands(gid: CacheTypeReducer<CacheType, Snowflake>, commandid: number): boolean{
    command.getActiveCommands(gid).then(async(response: any) => {
            for (const key in response.data) {
                if (response.data[key].mid == commandid) {
                    return true;
                }
            }
            return false;
        }
    )
    return false;
}
