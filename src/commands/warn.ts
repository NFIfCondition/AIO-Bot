import { SlashCommandBuilder } from "@discordjs/builders";

export = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warnt einen User')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Warnt den User auf deinem Discord Server')
                .setRequired(true))
}