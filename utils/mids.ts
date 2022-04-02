export enum ModuleNames{
    Chatclear = 1,
    Giveaway = 2,
    Reactrole = 3,
    Spamfilter = 4,
    Speaksupport = 5,
    Ticketsupport = 6,
    Joinmessage = 7,
    Aiospamfilter = 8,
    Streamer = 9,
}

export function moduleactive(response: any, module: number){
    for (const key in response){
        if (response[key].mid == module){
            return true;
        }
    }
    return false;
}