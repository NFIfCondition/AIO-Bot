import {Server} from 'ws'
import { EmbedBuilder } from 'discord.js';
import { CustomDiscordClient } from '../../CustomDiscordClient';

import {RedictURLs, Text} from '../../index';

export function websocket(bot: CustomDiscordClient, wss: Server){
    console.log("Websocket Established")
    wss.on('connection', function connection(ws) {
        console.log("Interface connected! Action revicived!");
        ws.on('message', function message(data) {
            if (data.toString().startsWith('sendmessage')){
                messageHandler(data.toString(), bot).then(r => console.log(r));
            }
        });
    });

    async function messageHandler(msg: string, bot: CustomDiscordClient){
        const ctx = msg.split(" ")
        if (ctx[3] == 'true'){
            const ctx = msg.split(" ")
            const channelID = ctx[1]
            const title = ctx[2]
            const react = ctx[4]
            let message = ""
            for (let i = 5; i < ctx.length; i++) {
                message += " " + ctx[i]
            }
            const webSocketMessageEmbed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setThumbnail('https://ionic-host.de/assets/img/ionic.png')
                    .setAuthor({ name:'AIO-Bot', iconURL:RedictURLs.icon, url:RedictURLs.website})
                    .addFields(
                        {name: title , value: message }  
                    )
                    .setTimestamp()
                    .setFooter({text:Text.embedFooter});
                const botObjc = await bot.getChannelFromCache(channelID)

                if (botObjc){
                    botObjc.send({embeds: [webSocketMessageEmbed]}).then((embedMessage: any) => {
                        embedMessage.react(react);
                    });
                }
        } else if (ctx[3] == 'false'){
            const channelID = ctx[1]
            const title = ctx[2]
            let message = ""
            for (let i = 3; i < ctx.length; i++) {
                message += " " + ctx[i]
            }
            const webSocketMessageEmbed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setThumbnail('https://ionic-host.de/assets/img/ionic.png')
                    .setAuthor({ name:'AIO-Bot', iconURL:'https://ionic-host.de/assets/img/ionic.png', url:'https://aio.ionic-host.de'})
                    .addFields(
                        {name: title , value: message }
                    )
                    .setTimestamp()
                    .setFooter({text:Text.embedFooter});

                    const botObjc = await bot.getChannelFromCache(channelID)

                    if (botObjc){
                        botObjc.send({embeds: [webSocketMessageEmbed]});
                    }
        }
    }
}