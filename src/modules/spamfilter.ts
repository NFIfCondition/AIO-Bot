import { MessageEmbed } from 'discord.js'
import {
    ModuleNamesToID,
    ModuleActive,
    ModuleNames,
    CustomDiscordClient,
    api
} from './../index'

export function spamfilter(bot: CustomDiscordClient){
    bot.on('messageCreate', async message =>{
        const guild = message.guildId
        const messageContent = message.content.split(" ")
        if (guild == undefined)
            return
        api.getModules(guild).then(async (repsonse: any) =>{
            if (ModuleActive(repsonse.data, ModuleNamesToID.Spamfilter)){
                api.getModule(guild, ModuleNames.Spamfilter).then(async (responespam: any) =>{
                    const words = responespam.badwords
                    const badwords = words.split(",")
                    for (const key in badwords){
                        if (message.content.includes(badwords[key])){
                            const channelObj = await bot.getChannelFromCache(message.channelId)
                            const msg = await message.delete()
                            
                            const streamerMSG = new MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle("Spam-BadWord Filter")
                            .setURL('https://aio.-ionic.host.de')
                            .setAuthor({ name:"Verwarnung", iconURL:'https://aio.-ionic.host.de/assets/img/ionic.png', url:'https://alicia.ionic-host.de'})
                            .addFields(
                                { name: 'Der User  ' + message.author.username, value: 'Hat ein verbotenes Wort geschrieben'},
                            )
                            .setTimestamp()

                            if (channelObj){
                                channelObj.send({embeds: [streamerMSG]})
                            }
                            console.log(msg)
                            return
                        }
                    }
                })
            } else if (ModuleActive(repsonse.data, ModuleNamesToID.Aiospamfilter)){
                api.getModule(guild, ModuleNames.Aiospamfilter).then(async (responespam: any) =>{
                    const words = responespam.badwords
                    const badwords = words.split(",")
                    for (const key in badwords){
                        if (message.content.includes(badwords[key])){
                            const channelObj = await bot.getChannelFromCache(message.channelId)
                            const msg = await message.delete()

                            const streamerMSG = new MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle("Spam-BadWord Filter")
                            .setURL('https://aio.-ionic.host.de')
                            .setAuthor({ name:"Verwarnung", iconURL:'https://aio.-ionic.host.de/assets/img/ionic.png', url:'https://alicia.ionic-host.de'})
                            .addFields(
                                { name: 'Der User  ' + message.author.username, value: 'Hat ein verbotenes Wort geschrieben'},
                            )
                            .setTimestamp()

                            if (channelObj){
                                channelObj.send({embeds: [streamerMSG]})
                            }

                            console.log(msg)
                        }
                    }
                })
            } else {
                console.log(message.content)
            }
        })
    })
}