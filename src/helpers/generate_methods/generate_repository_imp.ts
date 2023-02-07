
import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../format_struct_name';
import { rootFolderPath, errorHandler, findPath, findExports } from '../utils';
import { repositoryImpBody, repositoryImpExports } from '../file_contents/repository_imp_file';

export let generateCleanRepositoryImp = vscode.commands.registerCommand('flutter-clean-arch.create.repository.imp', async () => {

	let structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in snake case)" });
	let repositoryName = await vscode.window.showInputBox({ prompt: "Repository Name (type it in snake case)" });

	let className = '';
	let structFormattedName = '';
	const result = getFormattedStructName(structName?.split('_') ?? []);
	const resultModel = getFormattedStructName(repositoryName?.split('_') ?? []);
	className = resultModel[0];
	structFormattedName = result[1];
	let modulePath = findPath(`${rootFolderPath}\\`, `${structFormattedName}`);
	let folderPath = findPath(`${modulePath}\\`, `data\\`);


	let repositoriesImpFolder = findPath(folderPath, 'repositories');
	let repositoriesImpIndexFile = path.join(repositoriesImpFolder, `${repositoryName}_repository_imp.dart`);
	let repositoryImpExportsPath = path.join(repositoriesImpFolder, `repositories_exports.dart`);

	fs.writeFile(repositoriesImpIndexFile, repositoryImpBody(className), errorHandler);
	findExports(repositoryImpExportsPath, repositoryImpExports(repositoryName ?? ''));
});