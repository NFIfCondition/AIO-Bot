import {CustomDiscordClient} from "../CustomDiscordClient";
import {ticketsupport} from "../modules/ticketsupport";

export async function ticketsupporthandler(bot: CustomDiscordClient, interaction: any){
            console.log("123")
            if (interaction.options.getSubcommand() === "create") {
                //Pass
                ticketsupport.create(bot, "Ticket " , "932028932486754345", "1036315870781255842", "932029140381622302,932029140381622302", "932029140381622302,932029140381622302", "213551786009559040");
            } else if (interaction.options.getSubcommand() === "add") {
                //Pass
                //ticketsupport.add(bot, );
            } else if (interaction.options.getSubcommand() === "remove") {
                //Pass
                //ticketsupport.remove(bot, );
            } else if (interaction.options.getSubcommand() === "close") {
                //Pass
                //ticketsupport.close(bot, );
            } else if (interaction.options.getSubcommand() === "archive") {
                //Pass
                //ticketsupport.archive(bot, );
            } else if (interaction.options.getSubcommand() === "delete") {
                //Pass
                //ticketsupport.delete(bot, );
            }
}

