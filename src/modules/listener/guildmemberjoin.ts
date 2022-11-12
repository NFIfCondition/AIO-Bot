// MEMBER JOIN MESSAGE
import {
    CustomDiscordClient,
    JoinMessage,
    ModuleActive,
    ModuleNamesToID,
    replace,
    Text,
    RedictURLs
} from './../../index'
import { EmbedBuilder } from 'discord.js';

export function join(bot: CustomDiscordClient){
    bot.on('guildMemberAdd', member =>{
    const guildid = member.guild.id
        if (ModuleActive(guildid, ModuleNamesToID.Joinmessage)){
            JoinMessage.getMessage(guildid).then(async(response: any) =>{
                const title = replace(response.data[0].title, ["$user", "$date", "$time", "$useravatar"],   [member.displayName + "," + new Date("DD-MM-YYYY") + "," + new Date("HH:MM:SS") + "," + member.avatarURL])
                const subtitle = replace(response.data[0].subtitle, ["$user", "$date", "$time", "$useravatar"], [member.displayName + "," + new Date("DD-MM-YYYY") + "," + new Date("HH:MM:SS") + "," + member.avatarURL])
                const msg = replace(response.data[0].message, ["$user", "$date", "$time", "$useravatar"], [member.displayName + "," + new Date("DD-MM-YYYY") + "," + new Date("HH:MM:SS") + "," + member.avatarURL])

                const message = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle(title)
                    .setAuthor({ name:'AIO-Bot', iconURL:RedictURLs.icon, url:RedictURLs.website})
                    .setDescription(subtitle)
                    .setThumbnail('https://ionic-host.de/assets/img/ionic.png')

                    .addFields(
                        { name: '', value: msg},
                    )
                    .setTimestamp()
                    .setFooter({text:Text.embedFooter, iconURL:RedictURLs.icon});

                const channel = await bot.getChannelFromCache(response.data[0].channel)

                if (channel){
                    channel.send({embeds: [message]})
                }

                console.log("Join Message auf " + response.data[0].guildid);
                console.log(response.data)
            })
        } else {
            return;
        }
    });
}