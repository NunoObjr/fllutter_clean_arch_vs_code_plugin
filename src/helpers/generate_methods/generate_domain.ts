import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { rootFolderPath, errorHandler, findPath } from '../utils';
import { domainExports } from '../file_contents/domain_file';

export let generateCleanDomain = vscode.commands.registerCommand('flutter-clean-arch.create.domain', async () => {
  let folderPath = await vscode.window.showInputBox({ prompt: "Folder Path", value: path.join(`${rootFolderPath}`) });

  let domainFolder = findPath(folderPath ?? '', 'domain');
  let domainExportsPath = path.join(domainFolder, `domain_exports.dart`);

  fs.writeFile(domainExportsPath, domainExports(), errorHandler);
});