import {
    CustomDiscordClient,
    api
} from './../../index'


export function botjoin(bot: CustomDiscordClient){
    bot.on('guildCreate', guild =>{
        api.postNewBotCount(bot.guilds.cache.size)
        console.log("Server Count", bot.guilds.cache.size)
    });
}

export function botleave(bot: CustomDiscordClient){
    bot.on('botDelete', guild =>{
        api.postNewBotCount(bot.guilds.cache.size)
        console.log("Server Count", bot.guilds.cache.size)
    });
}