
import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../format_struct_name';
import { rootFolderPath, errorHandler, findPath } from '../utils';
import { repositoryImpBody, repositoryImpExports } from '../file_contents/repository_imp_file';

export let generateCleanRepositoryImp = vscode.commands.registerCommand('flutter-clean-arch.create.repository.imp', async () => {

	let folderPath = await vscode.window.showInputBox({ prompt: "Folder Path", value: path.join(`${rootFolderPath}` + '/data/') });
	let structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in cammel case)" });

	let className = '';
	let variableClassName = '';
	const result = getFormattedStructName(structName?.split('_') ?? []);
	className = result[0];
	variableClassName = result[1];


	let repositoriesImpFolder = findPath(folderPath ?? '', 'repositories');
	let repositoriesImpIndexFile = path.join(repositoriesImpFolder, `${structName}_repository_imp.dart`);
	let repositoryImpExportsPath = path.join(repositoriesImpFolder, `repositories_exports.dart`);

	fs.writeFile(repositoriesImpIndexFile, repositoryImpBody(className), errorHandler);
	fs.writeFile(repositoryImpExportsPath, repositoryImpExports(structName ?? ''), errorHandler);
});