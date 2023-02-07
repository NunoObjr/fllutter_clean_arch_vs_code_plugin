
export function pagesExports(structName: string): string {
  let exportsContent = `export '${structName}_page.dart';
`;
  return exportsContent;
}
export function pagesBody(className: string): string {
  let pagesContent = `import 'package:flutter/material.dart';
import '../presentation_exports.dart';
import 'package:flutter_modular/flutter_modular.dart';

class ${className}Page extends StatelessWidget {

	${className}Page({super.key, required this.controller});
  final ${className}Controller controller;
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}`;
  return pagesContent;
}