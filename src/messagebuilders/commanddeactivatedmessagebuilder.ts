import {CommandInteraction, EmbedBuilder} from 'discord.js'

import {
    RedictURLs,
    Text
} from '../index'

export function commanddeactivatedmessagebuilder(interaction: CommandInteraction, command: string){
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
                {name: 'Der Command ' + command + ' ist deaktiviert', value: '\u200b'},
                {name: 'Du kannst ihn im Dashboard Aktivieren', value:'\u200b'}
            )
            .setTimestamp()
            .setFooter({
                text: Text.embedFooter,
                iconURL: RedictURLs.icon
            });

        interaction.reply({embeds: [cleared]})
}