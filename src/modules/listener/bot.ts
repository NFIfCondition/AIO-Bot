import {
    CustomDiscordClient,
    websitestats
} from './../../index'


export function botjoin(bot: CustomDiscordClient){
    bot.on('guildCreate', guild =>{
        websitestats.setWebstats(bot.guilds.cache.size)
        console.log("Server Count", bot.guilds.cache.size)
    });
}