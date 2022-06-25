import {CommandInteraction, MessageEmbed} from 'discord.js'

export function commanddeactivatedmessagebuilder(interaction: CommandInteraction, command: string){
        const cleared = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('AIO-Bot')
            .setURL('https://aio.ionic-host.de')
            .setAuthor({
                name: 'AIO-Bot',
                iconURL: 'https://ionic-host.de/assets/img/ionic.png',
                url: 'https://aio.ionic-host.de'
            })
            .setThumbnail('https://ionic-host.de/assets/img/ionic.png')
            .addFields(
                {name: 'Der Command ' + command + 'ist deaktiviert', value: '\u200b'},
                {name: 'Du kannst ihn im Dashboard Aktivieren', value:'\u200b'}
            )
            .setTimestamp()
            .setFooter({
                text: 'AIO-Bot by Ionic-Host.de',
                iconURL: 'https://ionic-host.de/assets/img/ionic.png'
            });

        interaction.reply({embeds: [cleared]})
}