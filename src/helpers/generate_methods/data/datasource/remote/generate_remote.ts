import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../../../../format_struct_name';
import { rootFolderPath, errorHandler, findPath, findExports } from '../../../../utils';
import { remoteBody, remoteExports } from '../../../../file_contents/data/datasource/remote/remote_file';

export let generateCleanRemote = vscode.commands.registerCommand('flutter-clean-arch.create.remote', async () => {
  let structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in snake case)" });
  let remoteName = await vscode.window.showInputBox({ prompt: "Datasource Name (type it in snake case)" });

  let className = '';
  let structFormattedName = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  const resultModel = getFormattedStructName(remoteName?.split('_') ?? []);
  className = resultModel[0];
  structFormattedName = result[1];
  let modulePath = findPath(`${rootFolderPath}\\`, `${structFormattedName}`);
  let folderPath = findPath(`${modulePath}\\`, `data\\`);
  let datasourceFolde = findPath(`${folderPath}`, 'datasource\\');
  let remoteFolder = findPath(datasourceFolde, 'remote');
  let remoteIndexFile = path.join(remoteFolder, `${remoteName}_datasource_imp.dart`);
  let remoteExportsPath = path.join(remoteFolder, `remote_exports.dart`);

  fs.writeFile(remoteIndexFile, remoteBody(className), errorHandler);
  findExports(remoteExportsPath, remoteExports(remoteName ?? ''));
});