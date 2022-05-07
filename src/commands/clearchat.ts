import { SlashCommandBuilder } from "@discordjs/builders";

export = {
    data: new SlashCommandBuilder()
        .setName('clearchat')
        .setDescription('Löscht Nachricht in Channels')
        .addIntegerOption(option =>
            option.setName('anzahl')
                .setDescription('Löscht die Anzahl der Nachrichten in dem Channel')
                .setRequired(true)
                .setMaxValue(100)
                .setMinValue(1))
}