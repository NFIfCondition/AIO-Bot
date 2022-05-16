import { SlashCommandBuilder } from "@discordjs/builders";

export = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Erstellt dir einen Einladungs Link')
        .addIntegerOption(option =>
            option.setName('time')
                .setDescription('Dauer wie lange die Einladung Gültig ist. Ohne Angabe für immer')
                .setRequired(false))
}