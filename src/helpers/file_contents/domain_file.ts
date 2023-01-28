
export function domainExports(): string {
  let exportsContent = `export 'entities/entities_exports.dart';
export 'repositories/repositories_exports.dart';
export 'usecases/usecases_exports.dart';
`;
  return exportsContent;
}