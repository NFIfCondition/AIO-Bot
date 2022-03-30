const Discord = require('discord.js');
const passtokens = require('./utils/tokens.js')
const bot = new Discord.Client({ intents: 32767 });

const dcclientid = passtokens.dcclientid()
const token = passtokens.token()

//COMMANDS//
require('./commands/aliciahelp.js')

//MODULES&//
new (require('./modules/listener/interaction.js'))(bot);
new (require('./modules/listener/websocket.js'))(bot);
new (require('./modules/listener/guildmemberjoin.js'))(bot);
new (require('./modules/listener/messagecreate.js'))(bot);
require('./modules/ticketsupport.js');

require('./utils/aliciaapi.js')
require('./utils/moduleactive.js')
require('./utils/replaceVars.js')
console.log("test" ,token) 
bot.on('ready', () =>{  
	
	//ticketsupport.create(bot, "ifcondition test", "857332651531042856", "863475927031349268", "857333076707246131", "857332684450693120")
    //ticketsupport.add(bot, "857332651531042856", "958063131265994782", "692070395662041189")
	//ticketsupport.remove(bot, "857332651531042856", "958063131265994782", "692070395662041189")
	//ticketsupport.delete(bot, "958392271978504232")
	//streamMessageBuilder("abugoku9999", "949754173828759593")
    console.log("Gestartet")
    bot.user.setPresence({
        activities:[{
            name: '» Help | alicia-help',
            type: 'WATCHING',
        }],
        status: 'online'
    });
})

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');

const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    console.log(command.data.toJSON());
	commands.push(command.data.toJSON());
}

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