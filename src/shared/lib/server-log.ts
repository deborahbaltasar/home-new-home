function timestamp() {
  return new Date().toISOString();
}

function formatContext(context?: Record<string, unknown>) {
  if (!context) {
    return "";
  }

  const entries = Object.entries(context)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${String(value)}`);

  return entries.length ? ` ${entries.join(" ")}` : "";
}

export function logServerInfo(scope: string, message: string, context?: Record<string, unknown>) {
  console.info(`[${timestamp()}] [${scope}] ${message}${formatContext(context)}`);
}

export function logServerError(scope: string, message: string, context?: Record<string, unknown>) {
  console.error(`[${timestamp()}] [${scope}] ${message}${formatContext(context)}`);
}
