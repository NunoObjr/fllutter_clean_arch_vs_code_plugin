import * as vscode from 'vscode';
import path = require('path');
import fs = require("fs");
import { rootFolderPath, errorHandler, findPath, findExports } from '../../utils';
import { domainExports } from '../../file_contents/domain/domain_file';
import { entityBody, entityExports } from '../../file_contents/domain/entities/entity_file';
import { repositoryImpBody, repositoryImpExports } from '../../file_contents/data/repositories/repository_imp_file';
import { repositoryBody, repositoryExports } from '../../file_contents/domain/repositories/repository_file';
import { usecaseBody, usecaseExports } from '../../file_contents/domain/usecase/usecase_file';
import { getFormattedStructName } from '../../format_struct_name';

export let generateCleanDomain = vscode.commands.registerCommand('flutter-clean-arch.create.domain', async (userCalled: any) => {
  var structName = await vscode.window.showInputBox({ prompt: "Structure Name (type it in snake case)" });


  let className = '';
  let structFormattedName = '';
  const result = getFormattedStructName(structName?.split('_') ?? []);
  className = result[0];
  structFormattedName = result[1];

  let modulePath = findPath(`${rootFolderPath}\\`, `${structFormattedName}`);
  let folderPath = findPath(`${modulePath}\\`, `domain\\`);
  let domainExportsPath = path.join(folderPath, `domain_exports.dart`);
  let entitiesFolder = findPath(folderPath, 'entities');
  let entitiesIndexFile = path.join(entitiesFolder, `${structName}_entity.dart`);
  let entityExportsPath = path.join(entitiesFolder, `entities_exports.dart`);
  let repositoryFolder = findPath(folderPath, 'repositories');
  let repositoryIndexFile = path.join(repositoryFolder, `${structName}_repository.dart`);
  let repositoryExportsPath = path.join(repositoryFolder, `repositories_exports.dart`);
  let useCasesFolder = findPath(folderPath, 'usecases');
  let useCasesIndexFile = path.join(useCasesFolder, `${structName}_usecase.dart`);
  let useCaseExports = path.join(useCasesFolder, `usecases_exports.dart`);

  findExports(domainExportsPath, domainExports());
  fs.writeFile(entitiesIndexFile, entityBody(className), errorHandler);
  findExports(entityExportsPath, entityExports(structName ?? ''));
  fs.writeFile(repositoryIndexFile, repositoryBody(className), errorHandler);
  findExports(repositoryExportsPath, repositoryExports(structName ?? ''));
  fs.writeFile(useCasesIndexFile, usecaseBody(className, structFormattedName), errorHandler);
  findExports(useCaseExports, usecaseExports(structName ?? ''));
});