module.exports = {
        create : async function(bot, name,  guildid, channelsectionid, teamsupportroleids, teamadminroleids, userid){
                const guild = bot.guilds.cache.get(guildid)
                const cat = await bot.channels.fetch(channelsectionid)
                const teamroles = teamsupportroleids.split(",")
                const adminroles = teamadminroleids.split(",")
                let perms = [{id:userid, allow:[Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]}];

                for(const key of teamroles){
                        perms.push({id:key, allow:[Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]})
                }

                for(const key of adminroles){
                        perms.push({id:key, allow:[Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]})
                }
                
                await guild.channels.create(name,{
                        parent:cat,
                        permissionOverwrites: perms
                })
                //api insert channel id im zusammenhang mit der guildid
        },
        add : async function(bot, guildid, channelid , userid){
                const channel = await bot.channels.fetch(channelid)
                const member = await bot.users.fetch(userid)
                channel.permissionOverwrites.create(member, {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true
                })
        },
        remove : async function(bot, guildid, channelid , userid){
                //replace guildid to bot.guilds.cache.get(id)
                const channel = await bot.channels.fetch(channelid)
                const member = await bot.users.fetch(userid)
                channel.permissionOverwrites.delete(member, {})
        },
        close : async function(bot, channelid, userid){
                //replace guildid to bot.guilds.cache.get(id)
                const channel = await bot.channels.fetch(channelid)
                const memberarray = userid.split(",")
                for (const key of memberarray){
                        const member = await bot.users.fetch(key)
                        channel.permissionOverwrites.delete(member, {})
                }
        },
        archive : async function(bot, channelid, sectionid){
                const channel = await bot.channels.fetch(channelid)
                const section = await bot.channels.fetch(sectionid)
                channel.setParent(section)
        },
        delete : async function(bot, channelid){
                const channel = await bot.channels.fetch(channelid)
                channel.delete()
        }
}