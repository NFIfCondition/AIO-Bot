module.exports = function streamMessageBuilder(streamer, channel, bot){
    getStreamer(streamer).then(response =>{
        console.log(response.data.data)
        getStreamerbyid(response.data.data[0].user_id).then(responseid =>{
            const streamerMSG = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(response.data.data[0].title)
                    .setURL('https://twitch.tv/' + streamer)
                    .setAuthor({ name:streamer + ' is Live', iconURL:responseid.data.data[0].profile_image_url, url:'https://alicia.ionic-host.de'})
                    .setThumbnail()
                    .addFields(
                        { name: 'Playing ' + response.data.data[0].game_name, value: 'https://twitch.tv/' + streamer},
                    )
                    .setImage(response.data.data[0].thumbnail_url.replace("{width}", "1920").replace("{height}", "1080"))
                    .setTimestamp()
                    .setFooter({text:'Alicia-Bot by Ionic-Host.de', iconURL:'https://ionic-host.de/assets/img/ionic.png'});
            bot.channels.cache.get(channel).send({embeds: [streamerMSG]});
        })  
    })
}