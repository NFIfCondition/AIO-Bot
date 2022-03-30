const chatclear = require('./../../utils/mids.js').chatclear
const http = require('./../../utils/aliciaapi.js')
const active = require('./../../utils/moduleactive.js')
const ticketsupport = require('./../../modules/ticketsupport.js')
const {MessageEmbed } = require('discord.js');

module.exports = function interaction(bot) {
        bot.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand()) return;
            if (interaction.commandName === 'alicia-help') {
              const helpembed = new MessageEmbed()
                      .setColor('#0099ff')
                      .setTitle('Alicia-Bot')
                      .setURL('https://alicia.ionic-host.de')
                      .setAuthor({ name:'Alicia-Bot', iconURL:'https://ionic-host.de/assets/img/ionic.png', url:'https://alicia.ionic-host.de'})
                      .setDescription('Hilfe Liste')
                      .setThumbnail('https://ionic-host.de/assets/img/ionic.png')
                      .addFields(
                          { name: 'Webinterface:', value: 'https://alicia.ionic-host.de' },
                          { name: '\u200B', value: '\u200B' },
                          { name: 'alicia-warn', value: 'Warn User bei Eingestellten Warns erfolgt ein ban oder mute', inline: true },
                          { name: 'alicia-ban', value: 'Bannt einen User vom Discord', inline: true },
                          { name: 'alicia-mute', value: 'Mute einen User in Text Channels', inline: true },
                          { name: 'alicia-timeout <Time>', value: 'Timeoute einen User dieser kann keinen Channel mehr joinen oder in diesen schreiben', inline: true },
                          { name: 'alicia-invite <Time>', value: 'Erstelle einen Invite Link', inline: true },    
                          { name: 'clearchat', value: 'Löscht alle Nachrichten in einem Channel (nur bei nachrichten bis 14Tagen möglich)', inline: true },
                          { name: 'alicia-kick', value: 'Kickt den User vom Discord', inline: true },    
                      )
                      .setImage('https://ionic-host.de/assets/img/ionic.png')
                      .setTimestamp()
                      .setFooter({text:'Alicia-Bot by Ionic-Host.de', iconURL:'https://ionic-host.de/assets/img/ionic.png'});
                  await interaction.reply({embeds: [helpembed]})
            } else if (interaction.commandName === 'clearchat'){
                http(interaction.guildId, "modules").then(response =>{
                  if (active(response.data, chatclear)){
                      http(interaction.guildId, "module/chatclear").then(responseroles =>{
                          const roles = responseroles.data[0].roleid
                          if (roles.includes(roles)){
                              bot.channels.cache.get(interaction.channelId).bulkDelete(interaction.options._hoistedOptions[0].value, true)
                              const cleared = new MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle('Alicia-Bot')
                                .setURL('https://alicia.ionic-host.de')
                                .setAuthor({ name:'Alicia-Bot', iconURL:'https://ionic-host.de/assets/img/ionic.png', url:'https://alicia.ionic-host.de'})
                                .setThumbnail('https://ionic-host.de/assets/img/ionic.png')
                                .addFields(
                                    { name: 'Channel wurde Bereinigt von:', value: interaction.member.user.username } 
                                )
                                .setTimestamp()
                                .setFooter({text:'Alicia-Bot by Ionic-Host.de', iconURL:'https://ionic-host.de/assets/img/ionic.png'});
                    
                            interaction.reply({embeds: [cleared]})
                          }
                      })
                  }
              })
            } else if (interaction.commandName === 'ticketsupport'){
                if (interaction.options.getSubcommand() === 'create'){
                    ticketsupport.create()
                } else if (interaction.options.getSubcommand() === 'add'){
                    ticketsupport.add()
                }else if (interaction.options.getSubcommand() === 'remove'){
                    ticketsupport.remove()
                } else if (interaction.options.getSubcommand() === 'close'){
                    ticketsupport.close()
                } else if (interaction.options.getSubcommand() === 'archive'){
                    ticketsupport.archive()
                } else if (interaction.options.getSubcommand() === 'delete'){
                    ticketsupport.delete(bot, interaction.channelId)
                }
            }
          });
    }