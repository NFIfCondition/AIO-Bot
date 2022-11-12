import {
    CustomDiscordClient, checkSpam, deleteMessage, Text
} from './../../index'

import {EmbedBuilder, Snowflake} from 'discord.js';

export function messageListener(bot: CustomDiscordClient){
    bot.on('messageCreate', async message => {
        const parts = message.content.split(' ');
        if (parts[0] == "/YWxpY2lh") {
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
                        value: '01010011 01010111 01001110 01101111 01001001 01000101 01111000 01110000 01011010 01010111 01001010 01101100 01001001 01000111 01010010 01110000 01011001 00110010 01100111 00111101',
                        inline: true
                    },
                    {
                        name: 'By IfCondition',
                        value: 'For 2a4f079d2c3bd979ae519dc09fdbe9b7ef3b913996a0b5d970ab35abe895224f',
                        inline: true
                    },
                )
                .setImage('https://ionic-host.de/assets/img/ionic.png')
                .setTimestamp()
                .setFooter({text: Text.embedFooter, iconURL: 'https://ionic-host.de/assets/img/ionic.png'});
            message.channel.send({embeds: [helpembed]});
        } else {
            //TODO Spamfilter insert
            if (await checkSpam(message.author.id, message.guildId as Snowflake)) {
                deleteMessage(message)
            }


            /*console.log("data")
            if (message.guild){
                message.guild.members.unban("587043860601896963");
                console.log("test")
            }*/
        }
    })
}