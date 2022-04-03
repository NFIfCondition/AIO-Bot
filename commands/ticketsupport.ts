const { SlashCommandBuilder } = require('@discordjs/builders');
export = {
    data: new SlashCommandBuilder()
        .setName('ticketsupport')
        .setDescription('Ticket Support')
        .addSubcommand((subcommand:any) =>
            subcommand
                .setName('create')
                .setDescription('Erstellt ein Ticket')
                .addStringOption((option: any) => option.setName('anliegen').setDescription('Das Anliegen für dein Ticket')))
        .addSubcommand((subcommand:any) =>
            subcommand
                .setName('add')
                .setDescription('Fügt einen User zu diesem Ticket hinzu')
                .addUserOption((option: any) => option.setName('user').setDescription('Der User')))
        .addSubcommand((subcommand:any) =>
            subcommand
                .setName('remove')
                .setDescription('Entfernt einen User von diesem Ticket')
                .addUserOption((option: any) => option.setName('user').setDescription('Der User')))
        .addSubcommand((subcommand:any) =>
            subcommand
                .setName('close')
                .setDescription('Schließt das Ticket'))
        .addSubcommand((subcommand:any) =>
            subcommand
                .setName('archive')
                .setDescription('Archiviert das Ticket'))
        .addSubcommand((subcommand:any) =>
            subcommand
                .setName('delete')
                .setDescription('Löscht das Ticket'))
};