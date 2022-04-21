import { SlashCommandBuilder } from "@discordjs/builders"

export = {
    data: new SlashCommandBuilder()
        .setName('aio-help')
        .setDescription('Hilfe Liste für den AIO Bot')
}
