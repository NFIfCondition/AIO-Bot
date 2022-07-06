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
import {activeCommands} from "../../api/commands";
import {CommandName, CommandToId} from "../../utils/commandids";
import {commanddeactivatedmessagebuilder} from "../../messagebuilders/commanddeactivatedmessagebuilder";
import {nopermmessagebuilder} from "../../messagebuilders/nopermmessagebuilder";
import {kickmessage} from "../../messagebuilders/kickmessagebuilder";
import {mutemessage} from "../../messagebuilders/mutemessagebuilder";

export function interaction(bot: CustomDiscordClient) {
        bot.on('interactionCreate', async (interaction:Interaction) => {
            if (!interaction.isCommand()) return;
            const channel = await bot.getChannelFromCache(interaction.channelId)
            const member = interaction.member as GuildMember | APIInteractionGuildMember
            if (interaction.commandName === 'aio-help') {
              const helpEmbed = new MessageEmbed()
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
                  await interaction.reply({embeds: [helpEmbed]})
            } else if (interaction.commandName === 'clearchat'){
                if (interaction.guildId && bot.user) {
                    if (activeCommands(interaction.guildId, CommandToId.Clearchat)){
                        if (interaction.guild && interaction.member) {
                            if (!(!(interaction.member instanceof GuildMember) || interaction.member.partial)) {
                                const _roles = interaction.member._roles
                                if (_roles != null) {
                                    if (containsRolesInClearChat(interaction.guildId, _roles)) {
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

                                        await interaction.reply({embeds: [cleared]})
                                    }
                                }
                            }
                        }
                    } else {
                        const member = interaction.member
                        if (member){
                            commanddeactivatedmessagebuilder(interaction, CommandName.Clearchat)
                        }
                    }
                }
            } else if (interaction.commandName === 'ticketsupport'){
                //TODO
                if (activeCommands(interaction.guildId, CommandToId.Ticketsupport)){
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
                } else {
                    const member = interaction.member
                    if (member){
                        commanddeactivatedmessagebuilder(interaction, CommandName.Ticketsupport)
                    }
                }
            } else if (interaction.commandName === "invite"){
                if (interaction.guild && interaction.channel){
                    if (activeCommands(interaction.guildId, CommandToId.Invite)){
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
                    } else {
                        const member = interaction.member
                        if (member){
                            commanddeactivatedmessagebuilder(interaction, CommandName.Invite)
                        }
                    }
                }
            } else if (interaction.commandName === "ban"){
                if (interaction.guild && interaction.channel) {
                    if (activeCommands(interaction.guildId, CommandToId.Ban)) {
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
                                userobj.ban({days: time as number | undefined, reason: reason as string | undefined})
                                banmessage(member, interaction, userobj, time as number | undefined | string, reason as string | undefined)
                            }
                        } else {
                            const member = interaction.member as GuildMember | APIInteractionGuildMember
                            if (member){
                                nopermmessagebuilder(member, interaction)
                            }
                        }
                    } else {
                        commanddeactivatedmessagebuilder(interaction, CommandName.Ban)
                    }
                }
            } else if (interaction.commandName === "kick"){
                if (interaction.memberPermissions){
                    const perms = interaction.memberPermissions.has(Permissions.FLAGS.KICK_MEMBERS)
                    if (perms && interaction.options.data[0].user && interaction.guild) {
                        const user = interaction.options.data[0].user.id
                        const userobj = await interaction.guild.members.fetch(user)
                        let reason = undefined

                        if (interaction.options.data[1].name == "reason"){
                            reason = interaction.options.data[1].value
                        }
                        kickmessage(member, interaction, userobj, reason as string | undefined)
                        userobj.kick(reason as string | undefined)
                    }
                }
            } else if (interaction.commandName === "mute"){
                if (interaction.memberPermissions){
                    const perms = interaction.memberPermissions.has(Permissions.FLAGS.MUTE_MEMBERS)
                    if (perms && interaction.options.data[0].user && interaction.guild){
                        const user = interaction.options.data[0].user.id
                        const userobj = await interaction.guild.members.fetch(user)
                        let reason = undefined

                        if (interaction.options.data[1].name == "reason"){
                            reason = interaction.options.data[1].value
                        }
                        mutemessage(member, interaction, userobj, reason as string | undefined)
                        await userobj.voice.setMute(true, reason as string | undefined)
                    }
                }
            } else if (interaction.commandName === "unmute"){
                if (interaction.memberPermissions){
                    const perms = interaction.memberPermissions.has(Permissions.FLAGS.MUTE_MEMBERS)
                    if (perms && interaction.options.data[0].user && interaction.guild){
                        const user = interaction.options.data[0].user.id
                        const userobj = await interaction.guild.members.fetch(user)
                        let reason = undefined

                        if (interaction.options.data[1].name == "reason"){
                            reason = interaction.options.data[1].value
                        }
                        mutemessage(member, interaction, userobj, reason as string | undefined)
                        await userobj.voice.setMute(false, reason as string | undefined)
                    }
                }
            }
        });
}