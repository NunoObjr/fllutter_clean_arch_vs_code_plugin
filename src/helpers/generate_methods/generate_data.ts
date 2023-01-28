import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../format_struct_name';
import { rootFolderPath, errorHandler, findPath } from '../utils';
import { dataExports } from '../file_contents/data_file';

export let generateCleanData = vscode.commands.registerCommand('flutter-clean-arch.create.data', async () => {
  let folderPath = await vscode.window.showInputBox({ prompt: "Folder Path", value: path.join(`${rootFolderPath}`) });

  let dataFolder = findPath(folderPath ?? '', 'data');
  let dataExportsPath = path.join(dataFolder, `data_exports.dart`);

  fs.writeFile(dataExportsPath, dataExports(), errorHandler);
});