import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../format_struct_name';
import { rootFolderPath, errorHandler, findPath } from '../utils';
import { remoteBody, remoteExports } from '../file_contents/remote_file';

export let generateCleanRemote = vscode.commands.registerCommand('flutter-clean-arch.create.remote', async () => {
  let folderPath = await vscode.window.showInputBox({ prompt: "Folder Path", value: path.join(`${rootFolderPath}` + '/data/' + 'datsource/') });
  let structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in cammel case)" });

  let className = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  className = result[0];
  let remoteFolder = findPath(folderPath ?? '', 'remote');
  let remoteIndexFile = path.join(remoteFolder, `${structName}_datasource_imp.dart`);
  let remoteExportsPath = path.join(remoteFolder, `remote_exports.dart`);

  fs.writeFile(remoteIndexFile, remoteBody(className), errorHandler);
  fs.writeFile(remoteExportsPath, remoteExports(structName ?? ''), errorHandler);
});