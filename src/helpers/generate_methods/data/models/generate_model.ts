import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../../../format_struct_name';
import { rootFolderPath, errorHandler, findPath, findExports } from '../../../utils';
import { modelBody, modelExports } from '../../../file_contents/data/models/model_file';

export let generateCleanModel = vscode.commands.registerCommand('flutter-clean-arch.create.model', async () => {
  let structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in snake case)" });
  let modelName = await vscode.window.showInputBox({ prompt: "Model Name (type it in snake case)" });

  let className = '';
  let structFormattedName = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  const resultModel = getFormattedStructName(modelName?.split('_') ?? []);
  className = resultModel[0];
  structFormattedName = result[1];
  let modulePath = findPath(`${rootFolderPath}\\`, `${structFormattedName}`);
  let folderPath = findPath(`${modulePath}\\`, `data\\`);

  let modelsFolder = findPath(folderPath, 'models');
  let modelsIndexFile = path.join(modelsFolder, `${modelName}_model.dart`);
  let modelExportsPath = path.join(modelsFolder, `models_exports.dart`);

  findExports(modelExportsPath, modelExports(modelName ?? ''));
  fs.writeFile(modelsIndexFile, modelBody(className), errorHandler);
});