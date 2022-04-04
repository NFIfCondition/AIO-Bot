import{
	tokensFromEnvFile
} from './index'

import {Server} from 'ws'

import { CustomDiscordClient } from './CustomDiscordClient';
import { REST } from "@discordjs/rest"
import { Routes } from 'discord-api-types/v9'

import helpcommand from './commands/aiohelp'
import clearchat from './commands/clearchat';
import ticketsupport from './commands/ticketsupport';

//MODULES&//
import { interaction } from './modules/listener/interaction';
import {websocket} from './modules/listener/websocket';
import {join} from './modules/listener/guildmemberjoin';
import {messageListener} from './modules/listener/messagecreate'
import { spamfilter } from './modules/spamfilter'
import './modules/ticketsupport'
import './utils/replaceVars.js'

function startBotRoutine(){

	console.info('Starting Bot with ENV file ', process.argv[2])

	const wss = new Server({ port: 8080 });
	const tokens = tokensFromEnvFile(process.argv[2])
	const bot = new CustomDiscordClient({ intents: 32767 });

	const command = [helpcommand, clearchat, ticketsupport]
	const commands = []

	for (const key of command){
		commands.push(key.data.toJSON())
	}

	spamfilter(bot)
	messageListener(bot)
	join(bot)
	interaction(bot)
	websocket(wss, bot)

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