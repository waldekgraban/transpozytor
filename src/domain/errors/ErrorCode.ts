export const ERROR_CODES = {
  INVALID_NOTE: 'INVALID_NOTE',
  INVALID_INTERVAL: 'INVALID_INTERVAL',
  EMPTY_SCALE: 'EMPTY_SCALE',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
