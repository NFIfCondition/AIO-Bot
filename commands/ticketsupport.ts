import { SlashCommandSubcommandsOnlyBuilder } from "@discordjs/builders";
import { SlashCommandBuilder } from "@discordjs/builders";

export const TICKETSUPPORT_COMMAND : SlashCommandSubcommandsOnlyBuilder = 
new SlashCommandBuilder()
        .setName('ticketsupport')
        .setDescription('Ticket Support')
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Erstellt ein Ticket')
                .addStringOption(option => option.setName('anliegen').setDescription('Das Anliegen für dein Ticket')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Fügt einen User zu diesem Ticket hinzu')
                .addUserOption(option => option.setName('user').setDescription('Der User')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Entfernt einen User von diesem Ticket')
                .addUserOption(option => option.setName('user').setDescription('Der User')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('close')
                .setDescription('Schließt das Ticket'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('archive')
                .setDescription('Archiviert das Ticket'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription('Löscht das Ticket'))