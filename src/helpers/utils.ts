import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");

export let folders = vscode.workspace.workspaceFolders;
export let rootFolderPath = folders?.at(0)?.uri.fsPath;
export let errorHandler = (err: any) => {
    if (err) {
        console.error(err.message);
        return vscode.window.showErrorMessage("Failed to generate folder structure");
    }
};


export let findPath = (folderPath: string, paramPath: string): string => {
    let dir = `${folderPath}${paramPath}` ?? '';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    let presentationFolder = path.join(folderPath ?? '', `${paramPath}`);
    return presentationFolder;
};

export let findExports = (folderPath: string, content: string) => {


    fs.appendFile(folderPath, content, errorHandler);
};

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