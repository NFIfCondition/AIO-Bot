import { SlashCommandBuilder } from "@discordjs/builders";

export = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bannt einen User')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Bannt den User von deinem Discord Server')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('time')
                .setDescription('Wie viele Tage rückwirkend sollen die nachrichten des gebannten Users gelöscht werden')
                .setRequired(false)
                .setMaxValue(7))
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Grund des Bannes")
                .setRequired(false))

}