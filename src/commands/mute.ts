import { SlashCommandBuilder } from "@discordjs/builders";

export = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Stummt einen User')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Stummt den User von deinem Discord Server')
                .setRequired(true))
}