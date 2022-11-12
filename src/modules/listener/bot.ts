import {
    CustomDiscordClient,
    websitestats,
    slashCommands, tokensFromEnvFile
} from './../../index'

export function botjoin(bot: CustomDiscordClient){
    const tokens = tokensFromEnvFile(process.argv[2])
    bot.on('guildCreate', () =>{
        websitestats.setWebstats(bot.guilds.cache.size)
        console.log("Server Count", bot.guilds.cache.size)
        slashCommands(tokens);
    });
}