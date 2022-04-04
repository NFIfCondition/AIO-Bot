import {Server} from 'ws'
import { MessageEmbed } from 'discord.js';
import { CustomDiscordClient } from '../../CustomDiscordClient';

export function websocket(wsServer: Server, bot: CustomDiscordClient){
    wsServer.on('connection', function connection(ws) {
        console.log("Interface connected! Action revicived!");
        ws.on('message', function message(data) {
            if (data.toString().startsWith('sendmessage')){
                messagehandler(data.toString(), bot);
            }
    });
    });

    async function messagehandler(msg: string, bot: CustomDiscordClient){
        const ctx = msg.split(" ")
        if (ctx[3] == 'true'){
            const ctx = msg.split(" ")
            const channelid = ctx[1]
            const title = ctx[2]
            const react = ctx[4]
            let message = ""
            for (let i = 5; i < ctx.length; i++) {
                message += " " + ctx[i]
            }
            const helpembed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setThumbnail('https://ionic-host.de/assets/img/ionic.png')
                    .setAuthor({ name:'Alicia-Bot', iconURL:'https://ionic-host.de/assets/img/ionic.png', url:'https://alicia.ionic-host.de'})
                    .addFields(
                        {name: title , value: message }  
                    )
                    .setTimestamp()
                    .setFooter({text:'Alicia-Bot by Ionic-Host.de'});
                const botobjc = await bot.getChannelFromCache(channelid)

                if (botobjc){
                    botobjc.send({embeds: [helpembed]}).then((embedMessage: any) => {
                        embedMessage.react(react);
                    });
                }
        } else if (ctx[3] == 'false'){
            const channelid = ctx[1]
            const title = ctx[2]
            let message = ""
            for (let i = 3; i < ctx.length; i++) {
                message += " " + ctx[i]
            }
            const helpembed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setThumbnail('https://ionic-host.de/assets/img/ionic.png')
                    .setAuthor({ name:'Alicia-Bot', iconURL:'https://ionic-host.de/assets/img/ionic.png', url:'https://alicia.ionic-host.de'})
                    .addFields(
                        {name: title , value: message }  
                    )
                    .setTimestamp()
                    .setFooter({text:'Alicia-Bot by Ionic-Host.de'});

                    const botobjc = await bot.getChannelFromCache(channelid)

                    if (botobjc){
                        botobjc.send({embeds: [helpembed]});
                    }
        }
    }
}