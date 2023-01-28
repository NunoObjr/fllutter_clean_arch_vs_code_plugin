export function repositoryExports(structName: string): string {
  let exportsContent = `export '${structName}_repository.dart';`;
  return exportsContent;
}
export function repositoryBody(className: string): string {
  let repositoryContent = `import 'package:dartz/dartz.dart';
abstract class ${className}Repository {
	Future<Either<Exception, bool>> useMethod();
}`;
  return repositoryContent;
}