import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { rootFolderPath, errorHandler, findPath } from '../utils';
import { presentationExports } from '../file_contents/presentation_file';

export let generateCleanPresentation = vscode.commands.registerCommand('flutter-clean-arch.create.presentation', async () => {
  let folderPath = await vscode.window.showInputBox({ prompt: "Folder Path", value: path.join(`${rootFolderPath}`) });

  let presentationFolder = findPath(folderPath ?? '', 'presentation');
  let presentationExportsPath = path.join(presentationFolder, `presentation_exports.dart`);

  fs.writeFile(presentationExportsPath, presentationExports(), errorHandler);
});