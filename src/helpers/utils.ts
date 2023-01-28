import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");

export let folders = vscode.workspace.workspaceFolders;
export let rootFolderPath = folders?.at(0)?.uri.fsPath;
export let errorHandler = (err: any) => {
    if (err) {
        console.error(err.message);
        return vscode.window.showErrorMessage("Failed to generate pages folder structure");
    }
};


export let findPath = (folderPath: string, paramPath: string): string => {
    let dir = `${folderPath}/${paramPath}` ?? '';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    let presentationFolder = path.join(folderPath ?? '', `${paramPath}`);
    return presentationFolder;
};