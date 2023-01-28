import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../format_struct_name';
import { rootFolderPath, errorHandler, findPath } from '../utils';
import { datasourceBody, datasourceExports } from '../file_contents/datasource_file';

export let generateCleanDatasourceInterface = vscode.commands.registerCommand('flutter-clean-arch.create.datasource.interface', async () => {
  let folderPath = await vscode.window.showInputBox({ prompt: "Folder Path", value: path.join(`${rootFolderPath}` + '/data/') });
  let structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in cammel case)" });

  let className = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  className = result[0];

  let datasourceFolder = findPath(folderPath ?? '', 'datasource');
  let datasourceIndexFile = path.join(datasourceFolder, `${structName}_datasource.dart`);
  let datasourceExportsPath = path.join(datasourceFolder, `datasource_exports.dart`);

  fs.writeFile(datasourceIndexFile, datasourceBody(className), errorHandler);
  fs.writeFile(datasourceExportsPath, datasourceExports(structName ?? ''), errorHandler);
});