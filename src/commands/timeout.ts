import { SlashCommandBuilder } from "@discordjs/builders";

export = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeoutet einen User')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Timeoutet den User von deinem Discord Server')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('time')
                .setDescription('Dauer des Timeoutes')
                .setRequired(true))
}