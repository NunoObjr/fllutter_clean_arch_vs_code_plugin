import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../format_struct_name';
import { rootFolderPath, errorHandler, findPath, findExports } from '../utils';
import { usecaseBody, usecaseExports } from '../file_contents/usecase_file';

export let generateCleanUseCase = vscode.commands.registerCommand('flutter-clean-arch.create.useCase', async () => {

  let structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in snake case)" });
  let usecaseName = await vscode.window.showInputBox({ prompt: "Usecase Name (type it in snake case)" });


  let className = '';
  let variableClassName = '';
  let structFormattedName = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  const resultEntity = getFormattedStructName(usecaseName?.split('_') ?? []);
  className = resultEntity[0];
  variableClassName = result[0];
  structFormattedName = result[1];

  let modulePath = findPath(`${rootFolderPath}\\`, `${structFormattedName}`);
  let folderPath = findPath(`${modulePath}\\`, `domain\\`);
  let useCasesFolder = findPath(folderPath, 'usecases');
  let useCasesIndexFile = path.join(useCasesFolder, `${usecaseName}_usecase.dart`);
  let useCaseExports = path.join(useCasesFolder, `usecases_exports.dart`);

  findExports(useCaseExports, usecaseExports(usecaseName ?? ''));
  fs.writeFile(useCasesIndexFile, usecaseBody(className, variableClassName), errorHandler);

});