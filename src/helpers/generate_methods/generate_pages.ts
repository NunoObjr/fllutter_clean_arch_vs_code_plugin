import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../format_struct_name';
import { rootFolderPath, errorHandler, findPath, findExports } from '../utils';
import { pagesBody, pagesExports } from '../file_contents/pages_file';

export let generateCleanPages = vscode.commands.registerCommand('flutter-clean-arch.create.pages', async () => {
  let structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in snake case)" });
  let pageName = await vscode.window.showInputBox({ prompt: "Page Name (type it in snake case)" });

  let className = '';
  let structFormattedName = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  const resultPage = getFormattedStructName(pageName?.split('_') ?? []);
  className = resultPage[0];
  structFormattedName = result[1];
  let modulePath = findPath(`${rootFolderPath}\\`, `${structFormattedName}`);
  let folderPath = findPath(`${modulePath}\\`, `presentation\\`);

  let pagesFolder = findPath(folderPath, 'pages');
  let pagesIndexFile = path.join(pagesFolder, `${pageName}_page.dart`);
  let pagesExportsPath = path.join(pagesFolder, `pages_exports.dart`);
  findExports(pagesExportsPath, pagesExports(pageName ?? ''));

  fs.writeFile(pagesIndexFile, pagesBody(className), errorHandler);
});