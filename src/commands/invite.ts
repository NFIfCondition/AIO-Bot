import { SlashCommandBuilder } from "@discordjs/builders";

export = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Erstellt dir einen Einladungs Link')
        .addIntegerOption(option =>
            option.setName('time')
                .setDescription('Dauer in Minuten wie lange die Einladung Gültig ist. Ohne Angabe für immer')
                .setRequired(false))
        .addIntegerOption(option =>
            option.setName('maxusers')
                .setDescription('Wie oft die Einladung benutzt werden kann')
                .setRequired(false)
                .setMaxValue(100))
}