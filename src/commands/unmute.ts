import { SlashCommandBuilder } from "@discordjs/builders";

export = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Stummt einen User')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Stummt den User von deinem Discord Server')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Grund des Kickes')
                .setRequired(true))
}