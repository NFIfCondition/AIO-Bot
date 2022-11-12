import {CommandInteraction, GuildMember, EmbedBuilder} from 'discord.js'
import {APIInteractionGuildMember} from "discord-api-types/v9";
import {
    RedictURLs,
    Text
} from "../index"


export function kickmessage(member: GuildMember | APIInteractionGuildMember, interaction: CommandInteraction, user: GuildMember, reason: string | undefined){
    let _reason = reason
    if (_reason == undefined){
        _reason = "Kein Grund angegeben"
    }

    if (member){
        const kick = new EmbedBuilder()
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
                {name: 'Der User ', value: user.user.username},
                {name: 'Wurde gekickt von', value: member.user.username},
                {name: 'Grund', value: _reason},
            )
            .setTimestamp()
            .setFooter({
                text: Text.embedFooter,
                iconURL: RedictURLs.icon
            });

        interaction.reply({embeds: [kick]})
    }
}