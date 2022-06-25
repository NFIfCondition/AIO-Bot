import {
    CustomDiscordClient,
    containsRolesInClearChat,
    containsClientInClearChat,
    invitemessage,
    chatclearmessage,
    banmessage
} from './../../index'
import {GuildInvitableChannelResolvable, GuildMember, Interaction, MessageEmbed, Permissions} from 'discord.js'
import {APIInteractionGuildMember} from "discord-api-types/v10";

export function interaction(bot: CustomDiscordClient) {
        bot.on('interactionCreate', async (interaction:Interaction) => {
            if (!interaction.isCommand()) return;
            if (interaction.commandName === 'aio-help') {
              const helpembed = new MessageEmbed()
                      .setColor('#0099ff')
                      .setTitle('AIO-Bot')
                      .setURL('https://aio.ionic-host.de')
                      .setAuthor({ name:'AIO-Bot', iconURL:'https://ionic-host.de/assets/img/ionic.png', url:'https://aio.ionic-host.de'})
                      .setDescription('Hilfe Liste')
                      .setThumbnail('https://ionic-host.de/assets/img/ionic.png')
                      .addFields(
                          { name: 'Webinterface:', value: 'https://aio.ionic-host.de' },
                          { name: '\u200B', value: '\u200B' },
                          { name: 'warn', value: 'Warn User bei Eingestellten Warns erfolgt ein ban oder mute', inline: true },
                          { name: 'ban', value: 'Bannt einen User vom Discord', inline: true },
                          { name: 'mute', value: 'Mute einen User in Text Channels', inline: true },
                          { name: 'timeout <Time>', value: 'Timeoute einen User dieser kann keinen Channel mehr joinen oder in diesen schreiben', inline: true },
                          { name: 'invite <Time>', value: 'Erstelle einen Invite Link', inline: true },
                          { name: 'clearchat', value: 'Löscht alle Nachrichten in einem Channel (nur bei nachrichten bis 14Tagen möglich)', inline: true },
                          { name: 'kick', value: 'Kickt den User vom Discord', inline: true },
                      )
                      .setTimestamp()
                      .setFooter({text:'AIO-Bot by Ionic-Host.de', iconURL:'https://ionic-host.de/assets/img/ionic.png'});
                  await interaction.reply({embeds: [helpembed]})
            } else if (interaction.commandName === 'clearchat'){
                if (interaction.guildId && bot.user) {
                    if (interaction.guild && interaction.member) {
                        if (!(!(interaction.member instanceof GuildMember) || interaction.member.partial)) {
                            const _roles = interaction.member._roles
                            if (_roles != null) {
                                if (containsRolesInClearChat(interaction.guildId, _roles)) {
                                    const channel = await bot.getChannelFromCache(interaction.channelId)
                                    const valueInter = interaction.options.data[0]
                                    if (channel && valueInter && valueInter.value && Number(valueInter.value)) {
                                        await channel.bulkDelete(valueInter.value as number, true) //_hoistedOptions[0].value
                                    }
                                    const member = interaction.member
                                    if (member){
                                        chatclearmessage(member, interaction)
                                    }
                                }
                            }
                            const clients = await interaction.member.id
                            if (containsClientInClearChat(interaction.guildId, clients)){
                                const channel = await bot.getChannelFromCache(interaction.channelId)
                                const valueInter = interaction.options.data[0]
                                if (channel && valueInter && valueInter.value && Number(valueInter.value)) {
                                    await channel.bulkDelete(valueInter.value as number, true) //_hoistedOptions[0].value
                                }
                                const member = interaction.member
                                if (member){
                                    chatclearmessage(member, interaction)
                                }
                            }
                            if (!containsRolesInClearChat(interaction.guildId,interaction.member.id) && !containsClientInClearChat(interaction.guildId, interaction.member.id)){
                                const member = interaction.member
                                if(member){
                                    const cleared = new MessageEmbed()
                                        .setColor('#0099ff')
                                        .setTitle('AIO-Bot')
                                        .setURL('https://aio.ionic-host.de')
                                        .setAuthor({ name:'AIO-Bot', iconURL:'https://ionic-host.de/assets/img/ionic.png', url:'https://aio.ionic-host.de'})
                                        .setThumbnail('https://ionic-host.de/assets/img/ionic.png')
                                        .addFields(
                                            { name: 'Dazu hast du keine Rechte ', value:  member.user.username}
                                        )
                                        .setTimestamp()
                                        .setFooter({text:'AIO-Bot by Ionic-Host.de', iconURL:'https://ionic-host.de/assets/img/ionic.png'});

                                    interaction.reply({embeds: [cleared]})
                                }
                            }
                        }
                    }
                }
            } else if (interaction.commandName === 'ticketsupport'){
                if (interaction.options.getSubcommand() === 'create'){
                    //ticketsupport.create()
                } else if (interaction.options.getSubcommand() === 'add'){
                    //ticketsupport.add()
                }else if (interaction.options.getSubcommand() === 'remove'){
                    //ticketsupport.remove()
                } else if (interaction.options.getSubcommand() === 'close'){
                    //ticketsupport.close()
                } else if (interaction.options.getSubcommand() === 'archive'){
                    //ticketsupport.archive()
                } else if (interaction.options.getSubcommand() === 'delete'){
                    //ticketsupport.delete(bot, interaction.channelId)
                }
            } else if (interaction.commandName === "invite"){
                if (interaction.guild && interaction.channel){
                    const params = interaction.options.data[0]
                    if (params.name == "time"){
                        const time: number = interaction.options.data[0].value as number
                        if (time){
                            const invite = await interaction.guild.invites.create(interaction.channel as GuildInvitableChannelResolvable,{maxAge:(time*60), unique:true});
                            const member = interaction.member as GuildMember | APIInteractionGuildMember
                            if (member){
                                invitemessage(member, interaction, invite.code)
                            }
                        }
                    }
                    if (params.name == "maxusers"){
                        const users: number = interaction.options.data[0].value as number
                        const invite = await interaction.guild.invites.create(interaction.channel as GuildInvitableChannelResolvable,{maxUses: users, maxAge:0});
                        const member = interaction.member as GuildMember | APIInteractionGuildMember
                        if (member){
                            invitemessage(member, interaction, invite.code)
                        }
                    }

                }
            } else if (interaction.commandName === "ban"){
                if (interaction.memberPermissions){
                    const perms = interaction.memberPermissions.has(Permissions.FLAGS.BAN_MEMBERS)
                    if (perms && interaction.options.data[0].user && interaction.guild) {
                        const member = interaction.member as GuildMember | APIInteractionGuildMember
                        const user = interaction.options.data[0].user.id
                        const userobj = await interaction.guild.members.fetch(user)
                        let time = undefined
                        let reason = undefined

                        for (let i = 0; i < interaction.options.data.length; i++){
                            if (interaction.options.data[i].name == "time"){
                                time = interaction.options.data[i].value + " Tage"

                            }
                            if (interaction.options.data[i].name == "reason"){
                                reason = interaction.options.data[i].value

                            }
                        }
                        //userobj.ban({days: time as number | undefined, reason: reason as string | undefined})
                        banmessage(member, interaction, userobj, time as number | undefined | string, reason as string | undefined)
                    }
                }
            }
        });
}