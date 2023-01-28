export function modelExports(structName: string): string {
  let exportsContent = `export '${structName}_model.dart';`;
  return exportsContent;
}
export function modelBody(className: string): string {
  let modelContent = `import '../../domain/domain_exports.dart';
class ${className}Model extends ${className}Entity {
	${className}Model({
		required String name,
	}) : super(name: name,);

	${className}Model.fromMap(Map<String, dynamic> map)
		: super(
			name: map['name'],
			);
}`;
  return modelContent;
}