import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { rootFolderPath, errorHandler, findPath, findExports } from '../utils';
import { presentationExports } from '../file_contents/presentation_file';
import { controllerBody, controllerExports } from '../file_contents/controllers_file';
import { pagesBody, pagesExports } from '../file_contents/pages_file';
import { getFormattedStructName } from '../format_struct_name';

export let generateCleanPresentation = vscode.commands.registerCommand('flutter-clean-arch.create.presentation', async () => {
  var structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in snake case)" });

  let className = '';
  let structFormattedName = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  className = result[0];
  structFormattedName = result[1];
  let modulePath = findPath(`${rootFolderPath}\\`, `${structFormattedName}`);
  let folderPath = findPath(`${modulePath}\\`, `presentation\\`);
  let presentationExportsPath = path.join(folderPath, `presentation_exports.dart`);
  let pagesFolder = findPath(folderPath ?? '', 'pages');
  let pagesIndexFile = path.join(pagesFolder, `${structName}_page.dart`);
  let pagesExportsPath = path.join(pagesFolder, `pages_exports.dart`);
  let controllersFolder = findPath(folderPath ?? '', 'controllers');
  let controllersIndexFile = path.join(controllersFolder, `${structName}_controller.dart`);
  let controllersExportsPath = path.join(controllersFolder, `controllers_exports.dart`);

  findExports(presentationExportsPath, presentationExports());
  fs.writeFile(controllersIndexFile, controllerBody(className), errorHandler);
  findExports(controllersExportsPath, controllerExports(structName ?? ''));
  fs.writeFile(pagesIndexFile, pagesBody(className), errorHandler);
  findExports(pagesExportsPath, pagesExports(structName ?? ''));
});