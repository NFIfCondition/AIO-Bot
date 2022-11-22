import {
    Banmessage,
    Chatclearmessage,
    ContainsClientInClearChat,
    ContainsRolesInClearChat,
    CustomDiscordClient,
    Invitemessage,
    RedictURLs,
    Text,
} from './../../index'
import {EmbedBuilder, GuildInvitableChannelResolvable, GuildMember, PermissionsBitField,} from 'discord.js'
import {APIInteractionGuildMember} from "discord-api-types/v10";
import {activeCommands} from "../../api/commands";
import {CommandName, CommandToId} from "../../utils/commandids";
import {commanddeactivatedmessagebuilder} from "../../messagebuilders/commanddeactivatedmessagebuilder";
import {nopermmessagebuilder} from "../../messagebuilders/nopermmessagebuilder";
import {kickmessage} from "../../messagebuilders/kickmessagebuilder";
import {mutemessage} from "../../messagebuilders/mutemessagebuilder";
import {CommandInteractionOptionResolver} from "discord.js";
import {SlashCommandBuilder} from "@discordjs/builders";

export function interaction(bot: CustomDiscordClient) {
    bot.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        const channel = await bot.getChannelFromCache(interaction.channelId)
        const member = interaction.member as GuildMember | APIInteractionGuildMember
        if (interaction.commandName === 'aio-help') {
            const helpEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(Text.embedTitle)
                .setURL(RedictURLs.website)
                .setAuthor({
                    name: 'AIO-Bot',
                    iconURL: RedictURLs.icon,
                    url: RedictURLs.website
                })
                .setDescription('Hilfe Liste')
                .setThumbnail(RedictURLs.icon)
                .addFields(
                    {name: 'Webinterface:', value: RedictURLs.website},
                    {name: '\u200B', value: '\u200B'},
                    {name: 'warn', value: 'Warn User bei Eingestellten Warns erfolgt ein ban oder mute'},
                    {name: 'ban', value: 'Bannt einen User vom Discord'},
                    {name: 'mute', value: 'Mute einen User in Text Channels'},
                    {
                        name: 'timeout <Time>',
                        value: 'Timeoute einen User dieser kann keinen Channel mehr joinen oder in diesen schreiben'
                    },
                    {name: 'invite <Time>', value: 'Erstelle einen Invite Link'},
                    {
                        name: 'clearchat',
                        value: 'Löscht alle Nachrichten in einem Channel (nur bei nachrichten bis 14Tagen möglich)'
                    },
                    {name: 'kick', value: 'Kickt den User vom Discord'},
                )
                .setTimestamp()
                .setFooter({text: Text.embedFooter, iconURL: RedictURLs.icon});
            await interaction.reply({embeds: [helpEmbed]})
        } else if (interaction.commandName === 'clearchat') {
            if (interaction.guildId && bot.user) {
                if (activeCommands(interaction.guildId, CommandToId.ClearChat)) {
                    if (interaction.guild && interaction.member) {
                        if (!(!(interaction.member instanceof GuildMember) || interaction.member.partial)) {
                            const _roles = interaction.member.roles
                            if (_roles != null) {
                                if (ContainsRolesInClearChat(interaction.guildId, _roles)) {
                                    const valueInter = interaction.options.data[0]
                                    if (channel && valueInter && valueInter.value && Number(valueInter.value)) {
                                        await channel.bulkDelete(valueInter.value as number, true) //_hoistedOptions[0].value
                                    }
                                    const member = interaction.member
                                    if (member) {
                                        Chatclearmessage(member, interaction)
                                    }
                                }
                            }
                            const clients = await interaction.member.id
                            if (ContainsClientInClearChat(interaction.guildId, clients)) {
                                const valueInter = interaction.options.data[0]
                                if (channel && valueInter && valueInter.value && Number(valueInter.value)) {
                                    await channel.bulkDelete(valueInter.value as number, true) //_hoistedOptions[0].value
                                }
                                const member = interaction.member
                                if (member) {
                                    Chatclearmessage(member, interaction)
                                }
                            }
                            if (!ContainsClientInClearChat(interaction.guildId, interaction.member.id) && !ContainsClientInClearChat(interaction.guildId, interaction.member.id)) {
                                const member = interaction.member
                                if (member) {
                                    const cleared = new EmbedBuilder()
                                        .setColor('#0099ff')
                                        .setTitle(Text.embedTitle)
                                        .setURL(RedictURLs.website)
                                        .setAuthor({
                                            name: 'AIO-Bot',
                                            iconURL: RedictURLs.icon,
                                            url: RedictURLs.website
                                        })
                                        .setThumbnail(RedictURLs.icon)
                                        .addFields(
                                            {name: 'Dazu hast du keine Rechte ', value: member.user.username}
                                        )
                                        .setTimestamp()
                                        .setFooter({
                                            text: Text.embedFooter,
                                            iconURL: RedictURLs.icon
                                        });

                                    await interaction.reply({embeds: [cleared]})
                                }
                            }
                        }
                    }
                } else {
                    const member = interaction.member
                    if (member) {
                        commanddeactivatedmessagebuilder(interaction, CommandName.ClearChat)
                    }
                }
            }
<<<<<<< HEAD
         } else if (interaction.commandName === "invite") {
=======
        } else if (interaction.commandName === "invite") {
>>>>>>> messagebuilder
            if (interaction.guild && interaction.channel) {
                if (activeCommands(interaction.guildId, CommandToId.Invite)) {
                    const params = interaction.options.data[0]
                    if (params.name == "time") {
                        const time: number = interaction.options.data[0].value as number
                        if (time) {
                            const invite = await interaction.guild.invites.create(interaction.channel as GuildInvitableChannelResolvable, {
                                maxAge: (time * 60),
                                unique: true
                            });
                            const member = interaction.member as GuildMember | APIInteractionGuildMember
                            if (member) {
                                Invitemessage(member, interaction, invite.code)
                            }
                        }
                    }
                    if (params.name == "maxusers") {
                        const users: number = interaction.options.data[0].value as number
                        const invite = await interaction.guild.invites.create(interaction.channel as GuildInvitableChannelResolvable, {
                            maxUses: users,
                            maxAge: 0
                        });
                        const member = interaction.member as GuildMember | APIInteractionGuildMember
                        if (member) {
                            Invitemessage(member, interaction, invite.code)
                        }
                    }
                } else {
                    const member = interaction.member
                    if (member) {
                        commanddeactivatedmessagebuilder(interaction, CommandName.Invite)
                    }
                }
            }
        } else if (interaction.commandName === "ban") {
            if (interaction.guild && interaction.channel) {
                if (activeCommands(interaction.guildId, CommandToId.Ban)) {
                    if (interaction.memberPermissions) {
                        const perms = interaction.memberPermissions.has(PermissionsBitField.Flags.BanMembers)
                        if (perms && interaction.options.data[0].user && interaction.guild) {
                            const member = interaction.member as GuildMember | APIInteractionGuildMember
                            const user = interaction.options.data[0].user.id
                            const userobj = await interaction.guild.members.fetch(user)
                            let time = undefined
                            let reason = undefined

                            for (let i = 0; i < interaction.options.data.length; i++) {
                                if (interaction.options.data[i].name == "time") {
                                    time = interaction.options.data[i].value + " Tage"

                                }
                                if (interaction.options.data[i].name == "reason") {
                                    reason = interaction.options.data[i].value

                                }
                            }
                            userobj.ban({deleteMessageDays: time as number | undefined, reason: reason as string | undefined})
                            Banmessage(member, interaction, userobj, time as number | undefined | string, reason as string | undefined)
                        }
                    } else {
                        const member = interaction.member as GuildMember | APIInteractionGuildMember
                        if (member) {
                            nopermmessagebuilder(member, interaction)
                        }
                    }
                } else {
                    commanddeactivatedmessagebuilder(interaction, CommandName.Ban)
                }
            }
        } else if (interaction.commandName === "kick") {
            if (interaction.memberPermissions) {
                const perms = interaction.memberPermissions.has(PermissionsBitField.Flags.KickMembers)
                if (perms && interaction.options.data[0].user && interaction.guild) {
                    const user = interaction.options.data[0].user.id
                    const userobj = await interaction.guild.members.fetch(user)
                    let reason = undefined

                    if (interaction.options.data[1].name == "reason") {
                        reason = interaction.options.data[1].value
                    }
                    kickmessage(member, interaction, userobj, reason as string | undefined)
                    userobj.kick(reason as string | undefined)
                }
            }
        } else if (interaction.commandName === "mute") {
            if (interaction.memberPermissions) {
                const perms = interaction.memberPermissions.has(PermissionsBitField.Flags.MuteMembers)
                if (perms && interaction.options.data[0].user && interaction.guild) {
                    const user = interaction.options.data[0].user.id
                    const userobj = await interaction.guild.members.fetch(user)
                    let reason = undefined

                    if (interaction.options.data[1].name == "reason") {
                        reason = interaction.options.data[1].value
                    }
                    mutemessage(member, interaction, userobj, reason as string | undefined)
                    await userobj.voice.setMute(true, reason as string | undefined)
                }
            }
        } else if (interaction.commandName === "unmute") {
            if (interaction.memberPermissions) {
                const perms = interaction.memberPermissions.has(PermissionsBitField.Flags.MuteMembers)
                if (perms && interaction.options.data[0].user && interaction.guild) {
                    const user = interaction.options.data[0].user.id
                    const userobj = await interaction.guild.members.fetch(user)
                    let reason = undefined

                    if (interaction.options.data[1].name == "reason") {
                        reason = interaction.options.data[1].value
                    }
                    mutemessage(member, interaction, userobj, reason as string | undefined)
                    await userobj.voice.setMute(false, reason as string | undefined)
                }
            }
        }
    });
}