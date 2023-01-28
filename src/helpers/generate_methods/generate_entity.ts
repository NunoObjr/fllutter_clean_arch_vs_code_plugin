import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../format_struct_name';
import { rootFolderPath, errorHandler, findPath } from '../utils';
import { entityBody, entityExports } from '../file_contents/entity_file';

export let generateCleanEntity = vscode.commands.registerCommand('flutter-clean-arch.create.entity', async () => {
  let folderPath = await vscode.window.showInputBox({ prompt: "Folder Path", value: path.join(`${rootFolderPath}` + '/domain/') });
  let structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in cammel case)" });

  let className = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  className = result[0];

  let entitiesFolder = findPath(folderPath ?? '', 'entities');
  let entitiesIndexFile = path.join(entitiesFolder, `${structName}_entity.dart`);
  let entityExportsPath = path.join(entitiesFolder, `entities_exports.dart`);

  fs.writeFile(entitiesIndexFile, entityBody(className), errorHandler);
  fs.writeFile(entityExportsPath, entityExports(structName ?? ''), errorHandler);
});