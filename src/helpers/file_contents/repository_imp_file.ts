export function repositoryImpExports(structName: string): string {
	let exportsContent = `export '${structName}_repository_imp.dart';`;
	return exportsContent;
}
export function repositoryImpBody(className: string): string {
	let repositoriesContent = `import 'package:dartz/dartz.dart';
import '../../domain/domain_exports.dart';
import '../data_exports.dart';
class ${className}RepositoryImp implements ${className}Repository {
	final ${className}Datasource _datasource;
	${className}RepositoryImp(this._datasource);
	@override
	Future<Either<Exception, bool>> useMethod() async {
		try {
			final result = await _datasource.useMethod();
			return Right(result);
		} on Failure catch (_) {
			return Left(Exception());
		} on Exception catch (_) {
			return Left(Exception());
		}
	}
}`;
	return repositoriesContent;
}