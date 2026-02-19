type NormalizedError = {
  status?: number;
  message: string;
};

const parseJsonMessage = (raw?: string) => {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as { error?: string; message?: string };
    return parsed.error || parsed.message || null;
  } catch {
    return null;
  }
};

export const normalizeError = (error: unknown): NormalizedError => {
  if (error && typeof error === 'object') {
    const maybeStatus = (error as { status?: number }).status;
    const maybeMessage = (error as { message?: string }).message;
    if (maybeStatus || maybeMessage) {
      return {
        status: maybeStatus,
        message: maybeMessage || 'Unknown error'
      };
    }
  }

  if (error instanceof Error) {
    const match = error.message.match(/API request failed: (\d+)/);
    const status = match ? Number(match[1]) : undefined;
    const jsonPart = error.message.split(' - ')[1];
    const message = parseJsonMessage(jsonPart) || error.message;
    return { status, message };
  }

  return { message: 'Unknown error' };
};
