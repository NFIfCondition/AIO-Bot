import https from 'https';
import axios from 'axios';

export interface WebsiteStats{
    setWebstats: (bots: number)=> Promise<string>,
}

export const websitestats: WebsiteStats = {
    setWebstats: function(bots_: number){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/websitestats`
        return axios.post(url, {bots:bots_})
    },
}