import { CustomDiscordClient } from './CustomDiscordClient';
const bot = new CustomDiscordClient({ intents: 32767 });

import tokens from './utils/tokens'
const dcclientid = tokens.dcclientid()
const token = tokens.token()

import { HELP_COMMAND } from './commands/aliciahelp'
import { CLEARCHAT_COMMAND } from './commands/clearchat'
import { TICKETSUPPORT_COMMAND } from './commands/ticketsupport'

//MODULES&//
import { interaction } from './modules/listener/interaction';
import {websocket} from './modules/listener/websocket';
import {join} from './modules/listener/guildmemberjoin';
import {messageListener} from './modules/listener/messagecreate'
import './modules/ticketsupport'
import './utils/aliciaapi.js'
import './utils/moduleactive.js'
import './utils/replaceVars.js'
messageListener(bot)
join(bot)
interaction(bot)
websocket(bot)

bot.on('ready', () =>{
	if (bot.user){
		bot.user.setPresence({
			activities:[{
				name: '» Help | alicia-help',
				type: 'WATCHING',
			}],
			status: 'online'
		});
	}
})

import { REST } from "@discordjs/rest"
import { Routes } from 'discord-api-types/v9'
//const fs = require('node:fs');

/*const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    console.log(command.data.toJSON());
	commands.push(command.data.toJSON());
}*/

const commands = [HELP_COMMAND.toJSON(), TICKETSUPPORT_COMMAND.toJSON(), CLEARCHAT_COMMAND.toJSON]
console.log("COMMANDS ", commands)

const rest = new REST({ version: '9' }).setToken(token);
(async () => {
	try {
		await rest.put(
			Routes.applicationCommands(dcclientid),
			{ body: commands },
		);
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
bot.login(token)