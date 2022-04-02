import replaceOnce from "replace-once"

export function replaceVariables(msg: string, replaceval: string, replaces: string){
    var str = msg;
    var find = replaceval.split(",");
    var replace = replaces.split(",");
    return replaceOnce(str, find, replace, 'gi');
}


function MultiReplace(text: string, toBeReplacedTexts: string[], replacingTexts: string[])
{
	let replaced = text
	if (replacingTexts.length < toBeReplacedTexts.length)
	{
		throw "Kann keine Massen-Ersetzung mit weniger Werten als benötigt durchführen."
	}
	
	for (var i in toBeReplacedTexts) {
		replaced = replaced.replace(toBeReplacedTexts[i],replacingTexts[i])
	}
	
	return replaced
}