import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../format_struct_name';
import { rootFolderPath, errorHandler, findPath } from '../utils';
import { modelBody, modelExports } from '../file_contents/model_file';

export let generateCleanModel = vscode.commands.registerCommand('flutter-clean-arch.create.model', async () => {
  let folderPath = await vscode.window.showInputBox({ prompt: "Folder Path", value: path.join(`${rootFolderPath}` + '/data/') });
  let structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in cammel case)" });

  let className = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  className = result[0];

  let modelsFolder = findPath(folderPath ?? '', 'models');
  let modelsIndexFile = path.join(modelsFolder, `${structName}_model.dart`);
  let modelExportsPath = path.join(modelsFolder, `models_exports.dart`);

  fs.writeFile(modelsIndexFile, modelBody(className), errorHandler);
  fs.writeFile(modelExportsPath, modelExports(structName ?? ''), errorHandler);
});