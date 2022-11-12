import {EmbedBuilder, Snowflake} from 'discord.js'

import {ButtonBuilder, createMultiButtonOnEmbed, CustomDiscordClient, RedictURLs, Text} from "../index"

export async function Ticketsupportmessagebuilder(bot: CustomDiscordClient, channelid: Snowflake, title: string, sectitle: string, msg: string, btnlabel: string, btncsid: string){
    const btnraw = new ButtonBuilder({style: 1, label: btnlabel, custom_id: btncsid, disabled: false, type: 2})
    const btnfinish = createMultiButtonOnEmbed([btnraw.getButtonComponent()])
    if (channelid){
        const channel = await bot.getChannelFromCache(channelid)
        const ticketsupport = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(title)
            .setURL(RedictURLs.website)
            .setAuthor({
                name: 'AIO-Bot',
                iconURL: RedictURLs.icon,
                url: RedictURLs.website
            })
            .setThumbnail(RedictURLs.icon)
            .addFields(
                {name: sectitle, value: msg}
            )
            .setTimestamp()
            .setFooter({
                text: Text.embedFooter,
                iconURL: RedictURLs.icon
            });

        if (channel){
            await channel.send({embeds: [ticketsupport], components: [btnfinish]})
        }
    }
}