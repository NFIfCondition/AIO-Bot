import {
    ActionRowBuilder,
    APIActionRowComponent,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    TextChannel
} from "discord.js";
import {RedictURLs, Text} from "../index"

export async function patchesMessage(channel: TextChannel, changes: string[]) {
    const patchMessages = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(Text.embedTitle)
        .setURL(RedictURLs.website)
        .setAuthor({
            name: 'AIO-Bot',
            iconURL: RedictURLs.icon,
            url: RedictURLs.website
        })
        .setDescription('Neuste Änderungen am AIO-Bot')
        .setThumbnail(RedictURLs.icon)
        .addFields(
            {name: 'Webinterface:', value: RedictURLs.website},
            {name: '\u200B', value: '\u200B'},
            {name: 'Änderungen', value: "Die Änderungen sind ab 0:00Uhr für den Bot Verfügbar"}
        )
        .setTimestamp()
        .setFooter({text: Text.embedFooter, iconURL: RedictURLs.icon});

    for (const key in changes){
        patchMessages.addFields({name:key, value: changes[key]})
    }

    await channel.send({embeds: [patchMessages]})
}