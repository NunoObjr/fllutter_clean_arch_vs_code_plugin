import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { getFormattedStructName } from '../../format_struct_name';
import { rootFolderPath, errorHandler, findPath } from '../../utils';
import { dataExports } from '../../file_contents/data/data_file';
import { datasourceBody, datasourceExports } from '../../file_contents/data/datasource/datasource_file';
import { repositoryImpBody, repositoryImpExports } from '../../file_contents/data/repositories/repository_imp_file';
import { modelBody, modelExports } from '../../file_contents/data/models/model_file';
import { remoteBody, remoteExports } from '../../file_contents/data/datasource/remote/remote_file';

export let generateCleanData = vscode.commands.registerCommand('flutter-clean-arch.create.data', async () => {


  var folderPath = await vscode.window.showInputBox({ prompt: "Folder Path", value: path.join(`${rootFolderPath}`) });
  var structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in cammel case)" });

  let className = '';
  let variableClassName = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  className = result[0];
  variableClassName = result[1];
  let dataFolder = findPath(folderPath ?? '', 'data');
  let dataExportsPath = path.join(dataFolder, `data_exports.dart`);
  let modelsFolder = findPath(dataFolder ?? '', 'models');
  let modelsIndexFile = path.join(modelsFolder, `${structName}_model.dart`);
  let modelExportsPath = path.join(modelsFolder, `models_exports.dart`);
  let repositoriesImpFolder = findPath(dataFolder ?? '', 'repositories');
  let repositoriesImpIndexFile = path.join(repositoriesImpFolder, `${structName}_repository_imp.dart`);
  let repositoryImpExportsPath = path.join(repositoriesImpFolder, `repositories_exports.dart`);
  let datasourceFolder = findPath(folderPath ?? '', 'datasource');
  let datasourceIndexFile = path.join(datasourceFolder, `${structName}_datasource.dart`);
  let datasourceExportsPath = path.join(datasourceFolder, `datasource_exports.dart`);
  let remoteFolder = findPath(folderPath ?? '', 'remote');
  let remoteIndexFile = path.join(remoteFolder, `${structName}_datasource_imp.dart`);
  let remoteExportsPath = path.join(remoteFolder, `remote_exports.dart`);

  fs.writeFile(dataExportsPath, dataExports(), errorHandler);
  fs.writeFile(repositoriesImpIndexFile, repositoryImpBody(className), errorHandler);
  fs.writeFile(repositoryImpExportsPath, repositoryImpExports(structName ?? ''), errorHandler);
  fs.writeFile(modelsIndexFile, modelBody(className), errorHandler);
  fs.writeFile(modelExportsPath, modelExports(structName ?? ''), errorHandler);
  fs.writeFile(remoteIndexFile, remoteBody(className), errorHandler);
  fs.writeFile(remoteExportsPath, remoteExports(structName ?? ''), errorHandler);
  fs.writeFile(datasourceIndexFile, datasourceBody(className), errorHandler);
  fs.writeFile(datasourceExportsPath, datasourceExports(structName ?? ''), errorHandler);
});