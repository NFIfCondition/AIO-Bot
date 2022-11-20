import {CacheType, CacheTypeReducer, CategoryChannel, Channel, Snowflake, User} from "discord.js";

import {ReturnTypes} from '../index'

export interface TicketSupportHandler{
    create: (gid: CacheTypeReducer<CacheType, Snowflake>, client: User, section: CategoryChannel, team: Record<string, any>) => ReturnTypes | Channel,
    add: (gid: CacheTypeReducer<CacheType, Snowflake>, client: User, ticket: Channel) => ReturnTypes,
    remove: (gid: CacheTypeReducer<CacheType, Snowflake>, client: User, ticket: Channel) => ReturnTypes,
    close: (gid: CacheTypeReducer<CacheType, Snowflake>, client: User, ticket: Channel) => ReturnTypes,
    archive: (gid: CacheTypeReducer<CacheType, Snowflake>, client: User, ticket: Channel, section: CategoryChannel) => ReturnTypes,
    delete: (gid: CacheTypeReducer<CacheType, Snowflake>, client: User, ticket: Channel) => ReturnTypes,
}

export const ticketsupporthandler : TicketSupportHandler = {
    create : function (gid: CacheTypeReducer<CacheType, Snowflake>, client: User, section: CategoryChannel, team: Record<string, any>){
        return ReturnTypes.FAIL
    },
    add: function (gid: CacheTypeReducer<CacheType, Snowflake>, client: User, ticket: Channel){
        return ReturnTypes.FAIL
    },
    remove: function (gid: CacheTypeReducer<CacheType, Snowflake>, client: User, ticket: Channel){
        return ReturnTypes.FAIL
    },
    close: function (gid: CacheTypeReducer<CacheType, Snowflake>, client: User, ticket: Channel){
        return ReturnTypes.FAIL
    },
    archive: function (gid: CacheTypeReducer<CacheType, Snowflake>, client: User, ticket: Channel){
        return ReturnTypes.FAIL
    },
    delete: function (gid: CacheTypeReducer<CacheType, Snowflake>, client: User, ticket: Channel){
        return ReturnTypes.FAIL
    }
}