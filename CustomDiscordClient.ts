import Discord, { GuildChannel, Snowflake } from 'discord.js'
export class CustomDiscordClient extends Discord.Client{
    async fetchChannel(id:Snowflake): Promise<GuildChannel | undefined> {
        const returnValue = await this.channels.fetch(id)
        if (returnValue){
            return returnValue as GuildChannel
        } else {
            return undefined
        }
    }
}