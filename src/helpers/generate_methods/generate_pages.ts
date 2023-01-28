import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../format_struct_name';
import { rootFolderPath, errorHandler, findPath } from '../utils';
import { pagesBody, pagesExports } from '../file_contents/pages_file';

export let generateCleanPages = vscode.commands.registerCommand('flutter-clean-arch.create.pages', async () => {

  let folderPath = await vscode.window.showInputBox({ prompt: "Folder Path", value: path.join(`${rootFolderPath}` + '/presentation/') });
  let structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in cammel case)" });
  let className = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  className = result[0];

  let pagesFolder = findPath(folderPath ?? '', 'pages');
  let pagesIndexFile = path.join(pagesFolder, `${structName}_page.dart`);
  let pagesExportsPath = path.join(pagesFolder, `pages_exports.dart`);

  fs.writeFile(pagesIndexFile, pagesBody(className), errorHandler);
  fs.writeFile(pagesExportsPath, pagesExports(structName ?? ''), errorHandler);
});