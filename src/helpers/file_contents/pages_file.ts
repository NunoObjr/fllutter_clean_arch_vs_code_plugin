
export function pagesExports(structName: string): string {
  let exportsContent = `export '${structName}_page.dart';`;
  return exportsContent;
}
export function pagesBody(className: string): string {
  let pagesContent = `import 'package:flutter/material.dart';
import '../presentation_exports.dart';
import 'package:flutter_modular/flutter_modular.dart';

class ${className}Page extends StatelessWidget {

	${className}Page({super.key});
  final controller = Modular.get<${className}Controller>();
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}`;
  return pagesContent;
}