
import * as vscode from 'vscode';
import { generateCleanControllers } from './helpers/generate_methods/generate_controllers';
import { generateCleanData } from './helpers/generate_methods/generate_data';
import { generateCleanDatasourceInterface } from './helpers/generate_methods/generate_datasource';
import { generateCleanEntity } from './helpers/generate_methods/generate_entity';
import { generateCleanModel } from './helpers/generate_methods/generate_model';
import { generateModule } from './helpers/generate_methods/generate_module';
import { generateCleanPages } from './helpers/generate_methods/generate_pages';
import { generateCleanPresentation } from './helpers/generate_methods/generate_presentation';
import { generateCleanRemote } from './helpers/generate_methods/generate_remote';
import { generateCleanRepositoryInterface } from './helpers/generate_methods/generate_repository';
import { generateCleanRepositoryImp } from './helpers/generate_methods/generate_repository_imp';
import { generateCleanUseCase } from './helpers/generate_methods/generate_usecase';
import { generateCleanDomain } from './helpers/generate_methods/generate_domain';

//TODO - permitir selecionar a pasta com botao direito na pasta ao inves de clicar

export function activate(context: vscode.ExtensionContext) {


	console.log('Congratulations, your extension "flutter-clean-arch" is now active!');

	context.subscriptions.push(
		generateCleanPages,
		generateCleanUseCase,
		generateCleanPresentation,
		generateCleanControllers,
		generateModule,
		generateCleanModel,
		generateCleanRepositoryInterface,
		generateCleanRemote,
		generateCleanRepositoryImp,
		generateCleanDatasourceInterface,
		generateCleanData,
		generateCleanEntity,
		generateCleanDomain
	);
}


export function deactivate() { }










