const https = require('https');
const axios = require('axios');


module.exports = {
    get : function (gid, module){
        https.globalAgent.options.rejectUnauthorized = false;
        var url = `https://api.ionic-host.de/guild/${gid}/${module}`
        return axios.get(url)
    },
    post : function (module, objName, option){
        https.globalAgent.rejectUnauthorized = false;
            axios.post(`https://api-ionic-host.de/${module}/${option}`, objName)
    },
}
