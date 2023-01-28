export function dataExports(): string {
  let exportsContent = `export 'datasource/datasource_exports.dart';
export 'models/models_exports.dart';
export 'repositories/repositories_exports.dart';
`;
  return exportsContent;
}