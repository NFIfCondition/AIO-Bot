// MEMBER JOIN MESSAGE
import { 
    CustomDiscordClient,
    api,
    ModuleActive,
    ModuleNames,
    ModuleNamesToID,
    replace
} from './../../index'
import { MessageEmbed } from 'discord.js';

export function join(bot: CustomDiscordClient){
    bot.on('guildMemberAdd', member =>{
    const guildid = member.guild.id
    api.getModules(guildid).then((response: any ) => {
            if (ModuleActive(response.data, ModuleNamesToID.Joinmessage)){
                api.getModule(guildid, ModuleNames.Joinmessage).then(async(response: any) =>{
                    const title = replace(response.data[0].title, ["$user", "$date", "$time", "$useravatar"],   [member.displayName + "," + new Date("DD-MM-YYYY") + "," + new Date("HH:MM:SS") + "," + member.avatarURL])   
                    const subtitle = replace(response.data[0].subtitle, ["$user", "$date", "$time", "$useravatar"], [member.displayName + "," + new Date("DD-MM-YYYY") + "," + new Date("HH:MM:SS") + "," + member.avatarURL])
                    const msg = replace(response.data[0].message, ["$user", "$date", "$time", "$useravatar"], [member.displayName + "," + new Date("DD-MM-YYYY") + "," + new Date("HH:MM:SS") + "," + member.avatarURL])

                    const message = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(title)
                        .setAuthor({ name:'Alicia-Bot', iconURL:'https://ionic-host.de/assets/img/ionic.png', url:'https://alicia.ionic-host.de'})
                        .setDescription(subtitle)
                        .setThumbnail('https://ionic-host.de/assets/img/ionic.png')
            
                        .addFields(
                            { name: '', value: msg}, 
                        )
                        .setTimestamp()
                        .setFooter({text:'Alicia-Bot by Ionic-Host.de', iconURL:'https://ionic-host.de/assets/img/ionic.png'});
                        
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
        })
    });
}