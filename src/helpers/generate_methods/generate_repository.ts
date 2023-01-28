import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../format_struct_name';
import { rootFolderPath, errorHandler, findPath } from '../utils';
import { repositoryBody, repositoryExports } from '../file_contents/repository_file';

export let generateCleanRepositoryInterface = vscode.commands.registerCommand('flutter-clean-arch.create.repository.interface', async () => {
  let folderPath = await vscode.window.showInputBox({ prompt: "Folder Path", value: path.join(`${rootFolderPath}` + '/domain/') });
  let structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in cammel case)" });

  let className = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  className = result[0];

  let repositoryFolder = findPath(folderPath ?? '', 'repositories');
  let repositoryIndexFile = path.join(repositoryFolder, `${structName}_repository.dart`);
  let repositoryExportsPath = path.join(repositoryFolder, `repositories_exports.dart`);

  fs.writeFile(repositoryIndexFile, repositoryBody(className), errorHandler);
  fs.writeFile(repositoryExportsPath, repositoryExports(structName ?? ''), errorHandler);
});