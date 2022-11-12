import {CommandInteraction, GuildMember, EmbedBuilder} from 'discord.js'
import {APIInteractionGuildMember} from "discord-api-types/v10";

import {
    RedictURLs,
    Text
} from "../index"

export function Chatclearmessage(member: GuildMember | APIInteractionGuildMember, interaction: CommandInteraction){
    if (member) {
        const cleared = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(Text.embedTitle)
            .setURL(RedictURLs.website)
            .setAuthor({
                name: 'AIO-Bot',
                iconURL: RedictURLs.icon,
                url: RedictURLs.website
            })
            .setThumbnail(RedictURLs.icon)
            .addFields(
                {name: 'Channel wurde Bereinigt von:', value: member.user.username}
            )
            .setTimestamp()
            .setFooter({
                text: Text.embedFooter,
                iconURL: RedictURLs.icon
            });

        interaction.reply({embeds: [cleared]})
    }
}