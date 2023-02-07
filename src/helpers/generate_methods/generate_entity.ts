import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../format_struct_name';
import { rootFolderPath, errorHandler, findPath, findExports } from '../utils';
import { entityBody, entityExports } from '../file_contents/entity_file';

export let generateCleanEntity = vscode.commands.registerCommand('flutter-clean-arch.create.entity', async () => {
  let structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in snake case)" });
  let entityName = await vscode.window.showInputBox({ prompt: "Entity Name (type it in snake case)" });

  let className = '';
  let structFormattedName = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  const resultEntity = getFormattedStructName(entityName?.split('_') ?? []);
  className = resultEntity[0];
  structFormattedName = result[1];
  let modulePath = findPath(`${rootFolderPath}\\`, `${structFormattedName}`);
  let folderPath = findPath(`${modulePath}\\`, `domain\\`);

  let entitiesFolder = findPath(folderPath, 'entities');
  let entitiesIndexFile = path.join(entitiesFolder, `${entityName}_entity.dart`);
  let entityExportsPath = path.join(entitiesFolder, `entities_exports.dart`);

  findExports(entityExportsPath, entityExports(entityName ?? ''));
  fs.writeFile(entitiesIndexFile, entityBody(className), errorHandler);
});