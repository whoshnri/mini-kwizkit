export function publicErrorMessage(error: unknown, fallback: string) {
  const message = error instanceof Error ? error.message : typeof error === "string" ? error : "";
  if (
    !message ||
    /unexpected token|is not valid json|internal server error|failed to execute 'json'/i.test(
      message
    )
  ) {
    return fallback;
  }
  return message;
}
