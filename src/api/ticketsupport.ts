import https from 'https';
import axios from 'axios';
import {CacheType, CacheTypeReducer, Snowflake} from "discord.js";

import {
    ReturnTypes
} from "./../index"

export interface Commands{
    getTicketSection: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    getArchiveSection: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    setClosedTicket: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    getClosedTickets: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    setOpenTickets: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    getOpenTickets: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    setArchivedTickets: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    getArchivedTickets: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    getAllowedRoles: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
    getAllowedUser: (gid: CacheTypeReducer<CacheType, Snowflake>)=> Promise<string>,
}

export const command: Commands = {
    getTicketSection: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/ticketsupport/section/${gid}`
        return axios.get(url)
    },
    getArchiveSection: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/ticketsupport/section/${gid}`
        return axios.get(url)
    },
    setClosedTicket: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/guildcommands/${gid}`
        return axios.get(url)
    },
    getClosedTickets: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/ticketsupport/closed/${gid}`
        return axios.get(url)
    },
    setOpenTickets: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/guildcommands/${gid}`
        return axios.get(url)
    },
    getOpenTickets: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/ticketsupport/opened/${gid}`
        return axios.get(url)
    },
    setArchivedTickets: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/guildcommands/${gid}`
        return axios.get(url)
    },
    getArchivedTickets: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/ticketsupport/archive/${gid}`
        return axios.get(url)
    },
    getAllowedRoles: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/ticketsupport/allowedroles/${gid}`
        return axios.get(url)
    },
    getAllowedUser: function(gid: CacheTypeReducer<CacheType, Snowflake>){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/ticketsupport/allowedusers/${gid}`
        return axios.get(url)
    },

}

/*export function activeCommands(gid: CacheTypeReducer<CacheType, Snowflake>, commandid: number): ReturnTypes{
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
}*/
