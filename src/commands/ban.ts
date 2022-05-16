import { SlashCommandBuilder } from "@discordjs/builders";

export = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bannt einen User')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Bannt den User von deinem Discord Server')
                .setRequired(true))
}