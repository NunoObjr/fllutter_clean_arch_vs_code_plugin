

export function moduleBody(className: string, variableClassName: string): string {
	let moduleContent = `import 'data/data_exports.dart';
import 'domain/domain_exports.dart';
import 'presentation/presentation_exports.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'package:dio/dio.dart';
class ${className}Module extends Module {
	@override
	List<Bind> get binds => [
		/* DATASOURCES */
		Bind.lazySingleton<${className}Datasource>((i) => ${className}DatasourceImp(clientHttp: i.get<Dio>())),
		/* REPOSITORIES */
		Bind.lazySingleton<${className}Repository>((i) => ${className}RepositoryImp(i.get<${className}Datasource>())),
		/* USECASES */
		Bind.lazySingleton<${className}UseCase>(
			(i) => ${className}UseCaseImp(${variableClassName}Repository: i.get<${className}Repository>()),
		),
		/* CONTROLLERS */
		Bind.lazySingleton<${className}Controller>(
			(i) => ${className}Controller(${variableClassName}UseUsecase: i.get<${className}UseCase>())),
		];

	@override
	List<ModularRoute> get routes => [
		ChildRoute(
			'/${variableClassName}',
			child: (context, args) => ${className}Page(
				controller: Modular.get(),
			),
		),
	];
}`;
	return moduleContent;
}