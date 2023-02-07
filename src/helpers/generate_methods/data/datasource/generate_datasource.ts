import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../../../format_struct_name';
import { rootFolderPath, errorHandler, findPath, findExports } from '../../../utils';
import { datasourceBody, datasourceExports } from '../../../file_contents/data/datasource/datasource_file';
import { remoteBody, remoteExports } from '../../../file_contents/data/datasource/remote/remote_file';

export let generateCleanDatasourceInterface = vscode.commands.registerCommand('flutter-clean-arch.create.datasource.interface', async () => {
  let structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in snake case)" });
  let datasourceName = await vscode.window.showInputBox({ prompt: "Datasource Name (type it in snake case)" });

  let className = '';
  let structFormattedName = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  const resultModel = getFormattedStructName(datasourceName?.split('_') ?? []);
  className = resultModel[0];
  structFormattedName = result[1];
  let modulePath = findPath(`${rootFolderPath}\\`, `${structFormattedName}`);
  let folderPath = findPath(`${modulePath}\\`, `data\\`);

  let datasourceFolder = findPath(folderPath, 'datasource\\');
  let datasourceIndexFile = path.join(datasourceFolder, `${datasourceName}_datasource.dart`);
  let datasourceExportsPath = path.join(datasourceFolder, `datasource_exports.dart`);
  let remoteFolder = findPath(datasourceFolder, 'remote');
  let remoteIndexFile = path.join(remoteFolder, `${datasourceName}_datasource_imp.dart`);
  let remoteExportsPath = path.join(remoteFolder, `remote_exports.dart`);

  fs.writeFile(datasourceIndexFile, datasourceBody(className), errorHandler);
  findExports(datasourceExportsPath, datasourceExports(datasourceName ?? ''));
  fs.writeFile(remoteIndexFile, remoteBody(className), errorHandler);
  findExports(remoteExportsPath, remoteExports(datasourceName ?? ''));
});