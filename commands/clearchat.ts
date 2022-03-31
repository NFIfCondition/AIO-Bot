import { SlashCommandBuilder } from "@discordjs/builders";

export const CLEARCHAT_COMMAND : Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> = 
new SlashCommandBuilder()
        .setName('clearchat')
        .setDescription('Löscht Nachricht in Channels')
        .addIntegerOption(option =>
            option.setName('anzahl')
                .setRequired(true)
                .setMaxValue(100)
                .setMinValue(1))