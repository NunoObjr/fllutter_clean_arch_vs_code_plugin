
export function usecaseExports(structName: string): string {
	let exportsContent = `export '${structName}_usecase.dart';`;
	return exportsContent;
}
export function usecaseBody(className: string, variableClassName: string): string {
	let useCasesContent = `import 'package:dartz/dartz.dart';
import '../domain_exports.dart';
abstract class ${className}UseCase {
	Future<Either<Exception, bool>> call();
}

class ${className}UseCaseImp implements ${className}UseCase {
	final ${className}Repository _${variableClassName}Repository;

	${className}UseCaseImp({required ${className}Repository ${variableClassName}Repository}) : _${variableClassName}Repository = ${variableClassName}Repository;

	@override
	Future<Either<Exception, bool>> call() async {
		var response = await _${variableClassName}Repository.useMethod();
		return response;
	}
}`;
	return useCasesContent;
}