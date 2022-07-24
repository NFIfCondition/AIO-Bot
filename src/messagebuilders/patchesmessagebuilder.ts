import {CommandInteraction, MessageEmbed, TextChannel} from "discord.js";

export async function patchesMessage(channel: TextChannel, changes: string[]) {
    const patchMessages = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('AIO-Bot')
        .setURL('https://aio.ionic-host.de')
        .setAuthor({
            name: 'AIO-Bot',
            iconURL: 'https://ionic-host.de/assets/img/ionic.png',
            url: 'https://aio.ionic-host.de'
        })
        .setDescription('Neuste Änderungen am AIO-Bot')
        .setThumbnail('https://ionic-host.de/assets/img/ionic.png')
        .addFields(
            {name: 'Webinterface:', value: 'https://aio.ionic-host.de'},
            {name: '\u200B', value: '\u200B'},
            {name: 'Änderungen', value: "Die Änderungen sind ab 0:00Uhr für den Bot Verfügbar"}
        )
        .setTimestamp()
        .setFooter({text: 'AIO-Bot by Ionic-Host.de', iconURL: 'https://ionic-host.de/assets/img/ionic.png'});

    for (const key in changes){
        patchMessages.addFields({name:key, value: changes[key]})
    }

    await channel.send({embeds: [patchMessages]})
}