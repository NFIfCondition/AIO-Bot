import {
    CustomDiscordClient,
} from './../../index'


export function botjoin(bot: CustomDiscordClient){
    bot.on('guildCreate', guild =>{
        console.log("Server Count", bot.guilds.cache.size)
    });
}

export function botleave(bot: CustomDiscordClient){
    bot.on('botDelete', guild =>{
        console.log("Server Count", bot.guilds.cache.size)
    });
}