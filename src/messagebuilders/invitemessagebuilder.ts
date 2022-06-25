import {CommandInteraction, GuildMember, MessageEmbed} from 'discord.js'
import {APIInteractionGuildMember} from "discord-api-types/v9";


export function invitemessage(member: GuildMember | APIInteractionGuildMember, interaction: CommandInteraction, invitecode: string){
    if (member) {
        const invite = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('AIO-Bot')
            .setURL('https://aio.ionic-host.de')
            .setAuthor({
                name: 'AIO-Bot',
                iconURL: 'https://ionic-host.de/assets/img/ionic.png',
                url: 'https://aio.ionic-host.de'
            })
            .setThumbnail('https://ionic-host.de/assets/img/ionic.png')
            .addFields(
                {name: 'https://discord.gg/'+invitecode, value: "\u200b"},
                {name: 'Angefordert von ', value: member.user.username}
            )
            .setTimestamp()
            .setFooter({
                text: 'AIO-Bot by Ionic-Host.de',
                iconURL: 'https://ionic-host.de/assets/img/ionic.png'
            });

        interaction.reply({embeds: [invite]})
    }
}