const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('alicia-help')
		.setDescription('Hilfe Liste für den Alicia-AIO Bot'),
};