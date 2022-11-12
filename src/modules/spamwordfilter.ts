import {
    Message,
    Snowflake,
} from 'discord.js'
import {
    spamfilter
} from '../index'

const map = new Map<Snowflake, number>();

export async function checkSpam(user: Snowflake, gid: Snowflake): Promise<boolean> {
    const spamrate: number | undefined = await spamfilter.getSpamrate(gid)

    const spam = map.get(user)
    if (map.get(user) && spam){
        map.set(user, spam + 1)
        //console.log(map.get(user))
    } else {
        map.set(user, 1)
    }

    if (spamrate && spam) {
            return spamrate - 1 <= spam;
    }
    return false
}

export function deleteMessage(msg: Message){
    //TODO Delete Message
    msg.delete().then(() => "Deleted")
}

/*function checkMSGWithAIOSpam(msg: string, blocked: string[], whitelisted: string[]): string[] | undefined {
    const words = blocked
    const whitelistedwords = blocked
    // TODO: Return real logic, added return undefined to avoid build issues
    return undefined
}*/

/*function checkMSG(msg: string, blocked: string[]): string[] | undefined {

}*/

/*export function filter(bot: CustomDiscordClient) {
    bot.on('messageCreate', async message => {
        const guild = message.guildId


        if (guild == undefined || bot == undefined)
            return
        if (ModuleActive(guild, ModuleNamesToID.Spamfilter)) {
            const blackListedWords = spamfilter.getBlackListesWords(guild)
            const whiteListedWords = spamfilter.getWhitelistedWords(guild)
            //const badwords = words.length >= 1 ? words : words.split(" ")
        }
    })
}*/