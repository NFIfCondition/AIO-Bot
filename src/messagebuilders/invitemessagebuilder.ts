import {CommandInteraction, GuildMember, EmbedBuilder} from 'discord.js'
import {APIInteractionGuildMember} from "discord-api-types/v10";

import {
    RedictURLs,
    Text
} from "../index"


export function Invitemessage(member: GuildMember | APIInteractionGuildMember, interaction: CommandInteraction, invitecode: string){
    if (member) {
        const invite = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(Text.embedTitle)
            .setURL(RedictURLs.website)
            .setAuthor({
                name: 'AIO-Bot',
                iconURL: RedictURLs.icon,
                url: RedictURLs.website
            })
            .setThumbnail(RedictURLs.website)
            .addFields(
                {name: 'https://discord.gg/'+invitecode, value: "\u200b"},
                {name: 'Angefordert von ', value: member.user.username}
            )
            .setTimestamp()
            .setFooter({
                text: Text.embedFooter,
                iconURL: RedictURLs.icon
            });

        interaction.reply({embeds: [invite]})
    }
}