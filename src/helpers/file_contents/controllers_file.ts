export function controllerExports(structName: string): string {
  let exportsContent = `export '${structName}_controller.dart';`;
  return exportsContent;
}
export function controllerBody(className: string): string {
  let controllersContent = `import 'package:flutter/material.dart';
class ${className}Controller extends ChangeNotifier {
}
`;
  return controllersContent;
}