import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../format_struct_name';
import { rootFolderPath, errorHandler, findPath, findExports } from '../utils';
import { controllerBody, controllerExports } from '../file_contents/controllers_file';

export let generateCleanControllers = vscode.commands.registerCommand('flutter-clean-arch.create.controllers', async () => {
  let structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in snake case)" });
  let controllerName = await vscode.window.showInputBox({ prompt: "Controller Name (type it in snake case)" });

  let className = '';
  let structFormattedName = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  const resultController = getFormattedStructName(controllerName?.split('_') ?? []);
  className = resultController[0];
  structFormattedName = result[1];

  let modulePath = findPath(`${rootFolderPath}\\`, `${structFormattedName}`);
  let folderPath = findPath(`${modulePath}\\`, `presentation\\`);
  let controllersFolder = findPath(folderPath, 'controllers');
  let controllersIndexFile = path.join(controllersFolder, `${controllerName}_controller.dart`);
  let controllersExportsPath = path.join(controllersFolder, `controllers_exports.dart`);

  fs.writeFile(controllersIndexFile, controllerBody(className), errorHandler);
  findExports(controllersExportsPath, controllerExports(controllerName ?? ''));
});