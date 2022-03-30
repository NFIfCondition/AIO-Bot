// MEMBER JOIN MESSAGE
const http = require('./../../utils/aliciaapi.js')
const active = require('./../../utils/moduleactive.js')
const memberjoin = require('./../../utils/mids.js').joinmessage
const {MessageEmbed } = require('discord.js')

const replace = require('./../../utils/replaceVars');

module.exports = function join(bot){
    bot.on('guildMemberAdd', member =>{
    var guildid
    http(member.guild.id, "modules").then(response => {
            if (active(response.data, memberjoin)){
                http(guildid, "module/joinmessage").then(response =>{
                    var title = replace(response.data[0].title, "$user, $date, $time, $useravatar",   member.displayName + ", " + new Date("DD-MM-YYYY") +", "+ new Date("HH:MM:SS") +", "+ member.avatarURL)   
                    var subtitle = replace(response.data[0].subtitle, "$user, $date, $time, $useravatar", member.displayName + ", " + new Date("DD-MM-YYYY") +", "+ new Date("HH:MM:SS") +", "+ member.avatarURL)
                    var msg = replace(response.data[0].message, "$user, $date, $time, $useravatar", member.displayName + ", " + new Date("DD-MM-YYYY") +", "+ new Date("HH:MM:SS") +", "+ member.avatarURL)

                    const message = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(title)
                        .setAuthor({ name:'Alicia-Bot', iconURL:'https://ionic-host.de/assets/img/ionic.png', url:'https://alicia.ionic-host.de'})
                        .setDescription(subtitle)
                        .setThumbnail('https://ionic-host.de/assets/img/ionic.png')
            
                        .addFields(
                            { name: '', value: msg}, 
                        )
                        .setTimestamp()
                        .setFooter({text:'Alicia-Bot by Ionic-Host.de', iconURL:'https://ionic-host.de/assets/img/ionic.png'});
                    bot.channels.get(response.data[0].channel).send(message);
                    console.log("Join Message auf " + response.data[0].guildid);
                    console.log(response.data)
                })
            } else {
                return;
            }
        })
    });
}