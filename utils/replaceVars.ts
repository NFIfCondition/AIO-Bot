export interface MultiReplace{
	replace: (text: string, toBeReplacedTexts: string[], replacingTexts: string[]) => string
}

export function replace(text: string, toBeReplacedTexts: string[], replacingTexts: string[])
{
	let replaced = text
	if (replacingTexts.length < toBeReplacedTexts.length) {
		throw "Kann keine Massen-Ersetzung mit weniger Werten als benötigt durchführen."
	}
	for (const i in toBeReplacedTexts) {
		replaced = replaced.replace(toBeReplacedTexts[i],replacingTexts[i])
	}
	return replaced
}