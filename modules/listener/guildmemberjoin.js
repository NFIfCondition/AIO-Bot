// MEMBER JOIN MESSAGE
const http = require('./../../utils/aliciaapi.js')
const active = require('./../../utils/moduleactive.js')
const memberjoin = require('./../../utils/mids.js').joinmessage

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

                    msg = replace(msg)
                    console.log(title + subtitle + msg)
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