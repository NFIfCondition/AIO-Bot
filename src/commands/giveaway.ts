import {SlashCommandBuilder, SlashCommandStringOption, SlashCommandSubcommandBuilder} from "@discordjs/builders";

export = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Giveaway')
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
            subcommand
                .setName('info')
                .setDescription('Gibt dir nähere infos zu laufenden Giveaways auf diesem Discord Server'))
        .addSubcommand((subcommand: SlashCommandSubcommandBuilder) =>
            subcommand
                .setName('create')
                .setDescription('Erstellt ein neues Giveaway. Die Giveaway läuft eine Woche')
                .addStringOption((option: SlashCommandStringOption) => option.setName('beschreibung').setDescription('Beschreibung zum Giveaway'))
        )
};