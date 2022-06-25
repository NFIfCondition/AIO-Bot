import {CommandInteraction, GuildMember, MessageEmbed} from 'discord.js'
import {APIInteractionGuildMember} from "discord-api-types/v10";

export function chatclearmessage(member: GuildMember | APIInteractionGuildMember, interaction: CommandInteraction){
    if (member) {
        const cleared = new MessageEmbed()
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
                {name: 'Channel wurde Bereinigt von:', value: member.user.username}
            )
            .setTimestamp()
            .setFooter({
                text: 'AIO-Bot by Ionic-Host.de',
                iconURL: 'https://ionic-host.de/assets/img/ionic.png'
            });

        interaction.reply({embeds: [cleared]})
    }
}