const replaceOnce = require('replace-once');
module.exports = function replaceVariables(msg, replaceval, replaces){
    var str = msg;
    var find = replaceval.split(",");
    var replace = replaces.split(",");
    return replaceOnce(str, find, replace, 'gi');
}