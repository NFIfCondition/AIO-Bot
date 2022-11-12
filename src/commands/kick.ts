import { SlashCommandBuilder } from "@discordjs/builders";

export = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kickt einen User')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Kickt den User von deinem Discord Server')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Grund des Kickes')
                .setRequired(true))
}