import {
	tokensFromEnvFile,
	botjoin,
} from './index'

import { CustomDiscordClient } from './CustomDiscordClient'
import { REST } from "@discordjs/rest"
import { Routes } from 'discord-api-types/v9'
import { Server } from 'ws'

import helpcommand from './commands/aiohelp'
import bancommand from './commands/ban'
import clearchat from './commands/clearchat'
import giveawaycommand from './commands/giveaway'
import invitecommand from './commands/invite'
import kickcommand from './commands/kick'
import mutecommand from './commands/mute'
import ticketsupport from './commands/ticketsupport'
import timeoutcommand from './commands/timeout'
import warncommand from './commands/warn'

//MODULES&//
import { interaction } from './modules/listener/interaction'
import { websocket } from './modules/listener/websocket'
import { join } from './modules/listener/guildmemberjoin'
import { messageListener } from './modules/listener/messagecreate'
//import { spamfilter } from './modules/listener/spamfilter'
import './modules/ticketsupport'
import './utils/replaceVars.js'

//function loadAllData(){
//}

function startBotRoutine(){

	console.info('Starting Bot with ENV file ', process.argv[2])

	const tokens = tokensFromEnvFile(process.argv[2])
	const bot = new CustomDiscordClient({ intents: 32767 });

	console.log("Sever Count", bot.guilds.cache.size)

	const command = [helpcommand, bancommand, clearchat,giveawaycommand, invitecommand, kickcommand, mutecommand, ticketsupport, timeoutcommand, warncommand]
	const commands = []

	for (const key of command){
		commands.push(key.data.toJSON())
	}

	botjoin(bot)
	//spamfilter(bot)
	messageListener(bot)
	join(bot)
	interaction(bot)
	websocket(bot, new Server({ port: 8080 }))

	bot.on('ready', () =>{
		if (bot.user){
			bot.user.setPresence({
				activities:[{
					name: '» Help | aio-help',
					type: 'WATCHING',
				}],
				status: 'online'
			});
		}
	})

	const id = tokens.discordClientId
	const dctoken = tokens.discordToken
	if (dctoken && id){
		const rest = new REST({ version: '9' }).setToken(dctoken);
		(async () => {
			try {
					await rest.put(
						Routes.applicationCommands(id),
						{ body: commands},
					);
					console.log('Successfully reloaded application (/) commands.');
			} catch (error) {
				console.error(error);
			}
		})();
	}

	bot.login(dctoken)
}

startBotRoutine()