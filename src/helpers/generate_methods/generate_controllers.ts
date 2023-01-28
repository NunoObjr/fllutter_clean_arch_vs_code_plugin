import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../format_struct_name';
import { rootFolderPath, errorHandler, findPath } from '../utils';
import { controllerBody, controllerExports } from '../file_contents/controllers_file';

export let generateCleanControllers = vscode.commands.registerCommand('flutter-clean-arch.create.controllers', async () => {
  let folderPath = await vscode.window.showInputBox({ prompt: "Folder Path", value: path.join(`${rootFolderPath}` + `/presentation/`) });
  let structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in cammel case)" });
  let className = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  className = result[0];

  let controllersFolder = findPath(folderPath ?? '', 'controllers');
  let controllersIndexFile = path.join(controllersFolder, `${structName}_controller.dart`);
  let controllersExportsPath = path.join(controllersFolder, `controllers_exports.dart`);

  fs.writeFile(controllersIndexFile, controllerBody(className), errorHandler);
  fs.writeFile(controllersExportsPath, controllerExports(structName ?? ''), errorHandler);
});