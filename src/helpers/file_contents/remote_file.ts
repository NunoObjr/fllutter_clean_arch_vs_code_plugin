export function remoteExports(structName: string): string {
  let exportsContent = `export '${structName}_datasource_imp.dart';`;
  return exportsContent;
}
export function remoteBody(className: string): string {
  let remoteContent = `import 'package:dio/dio.dart';
import '../datasource_exports.dart';
class ${className}DatasourceImp implements ${className}Datasource {
	final Dio _clientHttp;
  ${className}DatasourceImp({required Dio clientHttp}) : _clientHttp = clientHttp;
	@override
	Future<bool> useMethod() async {
		return true;
	}
}`;
  return remoteContent;
}