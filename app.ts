import Discord from 'discord.js'
import { CustomDiscordClient } from './CustomDiscordClient';
import passtokens from './utils/tokens'
const bot = new CustomDiscordClient({ intents: 32767 });

const dcclientid = passtokens.dcclientid()
const token = passtokens.token()

import { HELP_COMMAND } from './commands/aliciahelp'
import { CLEARCHAT_COMMAND } from './commands/clearchat'
import { TICKETSUPPORT_COMMAND } from './commands/ticketsupport'

//MODULES&//
new (require('./modules/listener/interaction.js'))(bot);
new (require('./modules/listener/websocket.ts'))(bot);
new (require('./modules/listener/guildmemberjoin.js'))(bot);
new (require('./modules/listener/messagecreate.js'))(bot);
require('./modules/ticketsupport.ts');
require('./utils/aliciaapi.js')
require('./utils/moduleactive.js')
require('./utils/replaceVars.js')

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

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');

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