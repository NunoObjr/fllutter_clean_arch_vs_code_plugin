export function getFormattedStructName(names: string[]): [string, string] {
	let tempClassName = '';
	let tempVariableClassName = '';
	for (let index = 0; index < names.length; index++) {
		const element = names[index];
		tempClassName = tempClassName + `${element.charAt(0).toUpperCase()}` + `${element.substring(1)}`;
		if (index === 0) {
			tempVariableClassName = tempVariableClassName + `${element}`;
		} else {
			tempVariableClassName = tempVariableClassName + `${element.charAt(0).toUpperCase()}` + `${element.substring(1)}`;
		}

	}
	return [tempClassName, tempVariableClassName];
}