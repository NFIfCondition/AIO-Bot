import { config } from "dotenv"

export interface AioTokens{
    twitchClientKey: string
    twitchClientSecret : string
    twitchBearerToken: string
    discordClientId: string
    discordToken: string
    discordSecret: string
}

export function tokensFromEnvFile(fileLocation: string): AioTokens{
    const readConfig = config({path: fileLocation})
    if (readConfig.error){
            console.error(`Cannot read config, got error ${JSON.stringify(readConfig.error)}. App will shutdown`)
            process.exit(1)
    } else {
        
        const tokens = { twitchClientKey: process.env.T_CLIENTKEY,
            twitchClientSecret: process.env.T_CLIENTSECRET,
            twitchBearerToken: process.env.AUTHKEY,
            discordClientId: process.env.CLIENTID,
            discordToken: process.env.TOKEN,
            discordSecret: process.env.SECRET}


        if (!tokens.twitchClientKey || !tokens.twitchClientSecret || !tokens.twitchBearerToken || !tokens.discordClientId || !tokens.discordToken || !tokens.discordSecret){
            const availability = { twitchClientKey: tokens.twitchClientKey !== undefined,
             twitchClientSecret: tokens.twitchClientSecret !== undefined,
             twitchBearerToken: tokens.twitchBearerToken !== undefined,
             discordClientId: tokens.discordClientId !== undefined,
             discordToken: tokens.discordToken !== undefined,
             discordSecret: tokens.discordSecret !== undefined }
             console.error('One or more token are missing from configuration file. Tokens with "false" are not available ' +
            `see  ${JSON.stringify(availability)}. App will shutdown`);
            process.exit(1)
        } 
        
        return tokens as AioTokens

        
    }
}