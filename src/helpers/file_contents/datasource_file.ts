
export function datasourceExports(structName: string): string {
  let exportsContent = `export '${structName}_datasource.dart';
export 'remote/remote_exports.dart';`;
  return exportsContent;
}
export function datasourceBody(className: string): string {
  let datasourceContent = `abstract class ${className}Datasource {
	Future<double> useMethod();
}`;
  return datasourceContent;
}