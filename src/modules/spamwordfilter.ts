import {
    Message,Snowflake
} from 'discord.js'

import fuzzball from 'fuzzball';

import {
    CustomDiscordClient, ModuleActive, ModuleNamesToID,
    spamfilter
} from '../index'



/*
*       spamrate = nachrichten in der minute
*
*       nachrichten flow = 1Minute / spamrate + 2% toleranz
*
*
*
*/

const userMap = new Map();

export async function checkSpam(user: Snowflake, gid: Snowflake, message: Message, bot: CustomDiscordClient): Promise<boolean | undefined>{
    const spamrate: number | undefined = await spamfilter.getSpamrate(gid)
    if (userMap.has(user)){
        const userData = userMap.get(user);
        // time = actuall time
        // last msg content
        // last msg time
        // msg count
        const {time, lastmsg, msgs} = userData
        userData.time = message.createdTimestamp;
        userData.lastmsg = message.content;
        userData.msgs = 1;

        console.log(time, lastmsg, msgs)




    } else {
        const fn = setTimeout(() => {
            userMap.delete(user);
        }, 1000);
        userMap.set(user, {
            time: fn,
            lastmsg : message,
            msgs : 1
        });
    }
    return false
}

export function deleteMessage(msg: Message){
    //TODO Delete Message
    msg.delete().then(() => "Deleted")
}

export function filter(bot: CustomDiscordClient) {
    bot.on('messageCreate', async message => {
        const guild = message.guildId

        const ret = fuzzball.ratio("WIXXER", "WIXER");

        console.log(ret)


        if (guild == undefined || bot == undefined)
            return
        if (ModuleActive(guild, ModuleNamesToID.Spamfilter)) {
            const blackListedWords = spamfilter.getBlackListedWords(guild)
            const whiteListedWords = spamfilter.getWhitelistedWords(guild)
            //const badwords = words.length >= 1 ? words : words.split(" ")
        }
    })
}