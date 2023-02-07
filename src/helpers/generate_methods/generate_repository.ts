import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../format_struct_name';
import { rootFolderPath, errorHandler, findPath, findExports } from '../utils';
import { repositoryBody, repositoryExports } from '../file_contents/repository_file';

export let generateCleanRepositoryInterface = vscode.commands.registerCommand('flutter-clean-arch.create.repository.interface', async () => {
  let structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in snake case)" });
  let repositoryName = await vscode.window.showInputBox({ prompt: "Repository Name (type it in snake case)" });

  let className = '';
  let structFormattedName = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  const resultRepository = getFormattedStructName(repositoryName?.split('_') ?? []);
  className = resultRepository[0];
  structFormattedName = result[1];

  let modulePath = findPath(`${rootFolderPath}\\`, `${structFormattedName}`);
  let folderPath = findPath(`${modulePath}\\`, `domain\\`);
  let repositoryFolder = findPath(folderPath, 'repositories');
  let repositoryIndexFile = path.join(repositoryFolder, `${repositoryName}_repository.dart`);
  let repositoryExportsPath = path.join(repositoryFolder, `repositories_exports.dart`);

  findExports(repositoryExportsPath, repositoryExports(repositoryName ?? ''));
  fs.writeFile(repositoryIndexFile, repositoryBody(className), errorHandler);
});