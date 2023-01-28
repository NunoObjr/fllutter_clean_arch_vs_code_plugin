import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../format_struct_name';
import { rootFolderPath, errorHandler, findPath } from '../utils';
import { usecaseBody, usecaseExports } from '../file_contents/usecase_file';

export let generateCleanUseCase = vscode.commands.registerCommand('flutter-clean-arch.create.useCase', async () => {

  let folderPath = await vscode.window.showInputBox({ prompt: "Folder Path", value: path.join(`${rootFolderPath}` + '/domain/') });
  let structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in cammel case)" });


  let className = '';
  let variableClassName = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  className = result[0];
  variableClassName = result[1];

  let useCasesFolder = findPath(folderPath ?? '', 'usecases');
  let useCasesIndexFile = path.join(useCasesFolder, `${structName}_usecase.dart`);
  let useCaseExports = path.join(useCasesFolder, `usecases_exports.dart`);

  fs.writeFile(useCasesIndexFile, usecaseBody(className, variableClassName), errorHandler);
  fs.writeFile(useCaseExports, usecaseExports(structName ?? ''), errorHandler);

});