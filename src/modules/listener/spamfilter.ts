/*import { MessageEmbed } from 'discord.js'
import {
    ModuleNamesToID,
    ModuleActive,
    ModuleNames,
    CustomDiscordClient,
    api
} from '../../index'

function checkMSG(msg: string, blocked: string[]): string[] | undefined {
    const ret: string[] = []
    const v: string[] = msg.toLocaleLowerCase().split(" ");
    for (const w in v) {
        const detect = v[w]
        const detected = detect.split("")
        for (let i = 0; i < blocked.length; i++) {
            const blockedwords = [...new Set(blocked[i])].join('')
            const dcmsg = [...new Set(detected)].join('')
            if (dcmsg === blockedwords) {
                if (dcmsg == blockedwords) {
                    ret.push(blocked[i])
                }
            }
        }
    }
    return ret
}

function checkMSGWithAIOSpam(msg: string, blocked: string[], whitelisted: string[]): string[] | undefined{
    const words = blocked
    const whitelistedwords = blocked
    // TODO: Return real logic, added return undefined to avoid build issues
    return undefined 

}

export function spamfilter(bot: CustomDiscordClient){
    bot.on('messageCreate', async message =>{
        const guild = message.guildId
        if (guild == undefined || bot == undefined)
            return
        api.getModules(guild).then(async (repsonse: any) =>{
            console.log(repsonse.data)
            if (ModuleActive(repsonse.data, ModuleNamesToID.Spamfilter)){
                api.getModule(guild, ModuleNames.Spamfilter).then(async (responespam: any) =>{
                    const words = await responespam.data[0].badwords
                    const badwords = words.length >= 1 ? words : words.split(" ")
                    for (const key in badwords){
                        if (message.content.toLowerCase().includes(badwords[key])){
                            const channelObj = await bot.getChannelFromCache(message.channelId)
                            const msg = await message.delete()
                            const spam = new MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle('Spam-BadWord Filter')
                            .setURL('https://aio.ionic-host.de')
                            .setAuthor({ name:"Verwarnung", iconURL:'https://aio.ionic-host.de/assets/img/favicon.png', url:'https://aio.ionic-host.de'})
                            .addField(
                                'Ein User hat eine verbotene Nachricht gesendet',
                                '||' + message.author.toString() + '|| Hat ein verbotenes Wort geschrieben'
                            )
                            .setTimestamp()

                            if (channelObj){
                                channelObj.send({embeds: [spam]})
                            }
                            console.log(msg)
                            return
                        }
                    }
                })
            }
        })
    })
}*/