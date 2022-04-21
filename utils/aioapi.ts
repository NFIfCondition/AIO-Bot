import https from 'https';
import axios from 'axios';

export interface ApiRequest{
    getModule: (gid: string, module: string)=> Promise<string>,
    updateModule: (module: number, objName: object, option: string)=> Promise<string>
    getModules: (gid: string) => Promise<string>
}

//interface moduleObject{
//}

export const api: ApiRequest = {
    getModules: function(gid: string){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/guild/${gid}/modules`
        return axios.get(url)
    },
    getModule : function(gid: string, module: string){
        https.globalAgent.options.rejectUnauthorized = false;
        const url = `https://api.ionic-host.de/guild/${gid}/module/${module}`
        return axios.get(url)
    },
    updateModule : function(module: number, objName: object, option: string){
        https.globalAgent.options.rejectUnauthorized = false;
        return axios.post(`https://api-ionic-host.de/${module}/${option}`, objName)
    },
}
