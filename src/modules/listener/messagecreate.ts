import {
    CustomDiscordClient, checkSpam, deleteMessage, Text
} from './../../index'

import {EmbedBuilder, Snowflake} from 'discord.js';

export function messageListener(bot: CustomDiscordClient){
    bot.on('messageCreate', async message => {
        const parts = message.content.split(' ');
        if (parts[0] == "/VGFtYXJhCg==") {
            const helpembed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(Text.embedTitle)
                .setURL('https://aio.ionic-host.de')
                .setAuthor({
                    name: 'AIO-Bot',
                    iconURL: 'https://ionic-host.de/assets/img/ionic.png',
                    url: 'https://aio.ionic-host.de'
                })
                .setDescription('Secret')
                .setThumbnail('https://ionic-host.de/assets/img/ionic.png')

                .addFields(
                    {
                        name: 'Nachricht',
                        value: 'Kleines Developer Secret',
                        inline: true
                    },
                )
                .setImage('https://ionic-host.de/assets/img/ionic.png')
                .setTimestamp()
                .setFooter({text: Text.embedFooter, iconURL: 'https://ionic-host.de/assets/img/ionic.png'});
            message.channel.send({embeds: [helpembed]});
        } else {
            //TODO Spamfilter insert
            if (await checkSpam(message.author.id, message.guildId as Snowflake, message, bot)) {
                console.log("DEL")
                deleteMessage(message)
            }
        }
    })
}