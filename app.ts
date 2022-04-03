import { CustomDiscordClient } from './CustomDiscordClient';
const bot = new CustomDiscordClient({ intents: 32767 });

import {dcclientid, token} from './utils/tokens'
const dcclient: string = dcclientid()
const tokent = token()

import helpcommand from './commands/aiohelp'
import clearchat from './commands/clearchat';
import ticketsupport from './commands/ticketsupport';

const command = [helpcommand, clearchat, ticketsupport]
const commands = []

for (const key of command){
	commands.push(key.data.toJSON())
	console.log(commands)
}



//MODULES&//
import { interaction } from './modules/listener/interaction';
import {websocket} from './modules/listener/websocket';
import {join} from './modules/listener/guildmemberjoin';
import {messageListener} from './modules/listener/messagecreate'
import './modules/ticketsupport'
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
/*const commands:any = []

const commandFiles = fs.readdirSync('./commands').filter((file: any) => file.endsWith('.ts'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    console.log(command.data.toJSON());
	commands.push(command.data.toJSON());
}*/


//console.log("COMMANDS ", commands)

const rest = new REST({ version: '9' }).setToken(tokent);
(async () => {
	try {
		await rest.put(
			Routes.applicationCommands(dcclient),
			{ body: commands},
		);
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
bot.login(tokent)