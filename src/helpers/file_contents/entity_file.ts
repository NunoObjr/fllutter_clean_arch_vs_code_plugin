export function entityExports(structName: string): string {
  let exportsContent = `export '${structName}_entity.dart';`;
  return exportsContent;
}
export function entityBody(className: string): string {
  let entityContent = `class ${className}Entity {
	String name;
	${className}Entity({
		required this.name,
	});
}`;
  return entityContent;
}