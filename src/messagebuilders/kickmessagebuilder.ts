import {CommandInteraction, GuildMember, MessageEmbed} from 'discord.js'
import {APIInteractionGuildMember} from "discord-api-types/v9";


export function kickmessage(member: GuildMember | APIInteractionGuildMember, interaction: CommandInteraction, user: GuildMember, reason: string | undefined){
    let _reason = reason
    if (_reason == undefined){
        _reason = "Kein Grund angegeben"
    }

    if (member){
        const kick = new MessageEmbed()
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
                {name: 'Der User ', value: user.user.username},
                {name: 'Wurde gekickt von', value: member.user.username},
                {name: 'Grund', value: _reason},
            )
            .setTimestamp()
            .setFooter({
                text: 'AIO-Bot by Ionic-Host.de',
                iconURL: 'https://ionic-host.de/assets/img/ionic.png'
            });

        interaction.reply({embeds: [kick]})
    }
}