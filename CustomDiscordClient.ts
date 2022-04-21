import Discord, {GuildChannel, Snowflake, TextChannel, User} from 'discord.js'

export class CustomDiscordClient extends Discord.Client{
    async fetchChannel(id: Snowflake): Promise<GuildChannel | undefined> {
        const returnValue = await this.channels.fetch(id)
        if (returnValue){
            return returnValue as GuildChannel
        } else {
            return undefined
        }
    }

    async getChannelFromCache(id: Snowflake): Promise<TextChannel | undefined> {
        const returnValue = await this.channels.cache.get(id)
        if (returnValue && "send" in returnValue && "bulkDelete" in returnValue){
            return returnValue as TextChannel
        } else {
            return undefined
        }
    }
}