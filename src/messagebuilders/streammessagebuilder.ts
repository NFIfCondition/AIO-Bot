import{
    CustomDiscordClient,
    getStreamers,
} from '../index'

import { MessageEmbed } from 'discord.js'

export function streamMessageBuilder(streamer: string, channel: string, bot: CustomDiscordClient){
    getStreamers.getStreamer(streamer).then((response: any) =>{
        console.log(response.data.data)
        getStreamers.getStreamerbyId(response.data.data[0].user_id).then(async (responseid: any) =>{
            const streamerMSG = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(response.data.data[0].title)
                    .setURL('https://twitch.tv/' + streamer)
                    .setAuthor({ name:streamer + ' is Live', iconURL:responseid.data.data[0].profile_image_url, url:'https://aio.ionic-host.de'})
                    .addFields(
                        { name: 'Playing ' + response.data.data[0].game_name, value: 'https://twitch.tv/' + streamer},
                    )
                    .setImage(response.data.data[0].thumbnail_url.replace("{width}", "1920").replace("{height}", "1080"))
                    .setTimestamp()

                const channelOBJ = await bot.getChannelFromCache(channel)
                if (channelOBJ){
                    channelOBJ.send({embeds: [streamerMSG]});
                }
            
        })  
    })
}