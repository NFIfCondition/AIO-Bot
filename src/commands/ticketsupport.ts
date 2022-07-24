import {SlashCommandUserOption} from "@discordjs/builders";
import {SlashCommandStringOption} from "@discordjs/builders";
import {SlashCommandBuilder, SlashCommandSubcommandBuilder} from "@discordjs/builders";

export = {
    data: new SlashCommandBuilder()
        .setName('ticketsupport')
        .setDescription('Ticket Support')
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
            subcommand
                .setName('create')
                .setDescription('Erstellt ein Ticket')
                .addStringOption((option: SlashCommandStringOption) => option.setName('anliegen').setDescription('Das Anliegen für dein Ticket')))
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
            subcommand
                .setName('add')
                .setDescription('Fügt einen User zu diesem Ticket hinzu')
                .addUserOption((option: SlashCommandUserOption) => option.setName('user').setDescription('Der User')))
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
            subcommand
                .setName('remove')
                .setDescription('Entfernt einen User von diesem Ticket')
                .addUserOption((option: SlashCommandUserOption) => option.setName('user').setDescription('Der User')))
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
            subcommand
                .setName('close')
                .setDescription('Schließt das Ticket'))
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
            subcommand
                .setName('archive')
                .setDescription('Archiviert das Ticket'))
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
            subcommand
                .setName('delete')
                .setDescription('Löscht das Ticket'))
};