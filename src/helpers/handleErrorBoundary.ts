export function handleErrorBoundary(error: any, stackTrace: string) {
  console.log(stackTrace, error);
  return error;
}
