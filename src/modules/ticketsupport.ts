import {CategoryChannelResolvable, PermissionsBitField} from 'discord.js'
import { CustomDiscordClient } from '../CustomDiscordClient'
import {interaction} from "./listener/interaction";

export interface TicketSupportInterface{
        create: (bot: CustomDiscordClient, name: string,  guildid: string, channelsectionid: string, teamsupportroleids: string, teamadminroleids: string, userid: string) => void
        add:(bot: CustomDiscordClient, guildid: string, channelid: string, userid: string) => void
        remove: (bot: CustomDiscordClient, guildid: string, channelid: string, userid: string) => void
        close: (bot: CustomDiscordClient, channelid: string, userid: string) => void
        archive: (bot: CustomDiscordClient, channelid: string, sectionid: string) => void
        delete: (bot: CustomDiscordClient, channelid: string) => void
}

export const ticketsupport: TicketSupportInterface = {
        create : async function(bot: CustomDiscordClient, name: string,  guildid: string, channelsectionid: string, teamsupportroleids: string, teamadminroleids: string, userid: string){
                const guild = bot.guilds.cache.get(guildid)
                const cat = await bot.fetchChannel(channelsectionid)
                const teamroles = teamsupportroleids.split(",")
                const adminroles = teamadminroleids.split(",")
                const perms = [
                    {
                            id: guildid,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                            id: userid,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                    }
                ];

                for(const key of teamroles){
                        perms.push({
                                id: key,
                                allow: [PermissionsBitField.Flags.ViewChannel],
                        },)
                }

                for(const key of adminroles){
                        perms.push({
                                id: key,
                                allow: [PermissionsBitField.Flags.ViewChannel],
                        },)                }

                if (guild && cat){
                        const channel = await guild.channels.create({
                                name: name,
                                parent:cat as CategoryChannelResolvable,
                                permissionOverwrites: perms
                        })
                }
                
                //api insert channel id im zusammenhang mit der guildid
        },
        add : async function(bot: CustomDiscordClient, guildid: string, channelid: string, userid: string){
                const channel = await bot.fetchChannel(channelid)
                const member = await bot.users.fetch(userid)

                if (channel){
                        channel.permissionOverwrites.create(member, {
                                ViewChannel: true,
                                SendMessages: true
                        })
                }
        },
        remove : async function(bot: CustomDiscordClient, guildid: string, channelid: string, userid: string){
                //replace guildid to bot.guilds.cache.get(id)
                const channel = await bot.fetchChannel(channelid)
                const member = await bot.users.fetch(userid)

                if (channel){
                        channel.permissionOverwrites.delete(member)
                }
        },
        close : async function(bot: CustomDiscordClient, channelid: string, userid: string){
                const channel = await bot.fetchChannel(channelid)
                const memberarray = userid.split(",")
                for (const key of memberarray){
                        const member = await bot.users.fetch(key)
                        if (channel){
                                channel.permissionOverwrites.delete(member)
                        }
                }
        },
        archive : async function(bot: CustomDiscordClient, channelid: string, sectionid: string){
                const channel = await bot.fetchChannel(channelid)
                const section = await bot.fetchChannel(sectionid)

                if (channel && section){
                        channel.setParent(section as CategoryChannelResolvable)
                }
        },
        delete : async function(bot: CustomDiscordClient, channelid: string){
                const channel = await bot.fetchChannel(channelid)
                if (channel){
                        channel.delete()
                }
        }
}