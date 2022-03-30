const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const {MessageEmbed } = require('discord.js')
const passtokens = require('./utils/tokens.js')
const bot = new Discord.Client({ intents: 32767 });

const tclientkey = passtokens.tclientkey()
const tclientSecret = passtokens.tclientSecret()
const authkey = passtokens.authkey()
const dcclientid = passtokens.dcclientid()
const token = passtokens.token()
const secret = passtokens.secret()

const prefix = 'alicia-'

//COMMANDS//
const ping = require('./commands/aliciahelp.js')

//MODULES&//
const interaction = new (require('./modules/listener/interaction.js'))(bot);
const websocket = new (require('./modules/listener/websocket.js'))(bot);
const memberjoin = new (require('./modules/listener/guildmemberjoin.js'))(bot);
const messagerListener = new (require('./modules/listener/messagecreate.js'))(bot);
const ticketsupport = require('./modules/ticketsupport.js');

const http = require('./utils/aliciaapi.js')
const active = require('./utils/moduleactive.js')
const replace = require('./utils/replaceVars.js')
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
const { SlashCommandBuilder } = require('@discordjs/builders');
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