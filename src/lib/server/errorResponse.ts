import { json } from '@sveltejs/kit'

const _ERROR_CODES = {
  KV_KEY_EXIST: 'KV_KEY_EXIST',
  INVALID_INPUT: 'INVALID_INPUT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
}

type ErrorCode = keyof typeof _ERROR_CODES

const statusByErrorCode: Record<ErrorCode, number> = {
  KV_KEY_EXIST: 409,
  INVALID_INPUT: 400,
  INTERNAL_ERROR: 500,
  UNKNOWN_ERROR: 400,
}

export function errorResponseWithCode (errorCode: ErrorCode, message: string) {
  return json({ errorCode, error: message }, { status: statusByErrorCode[errorCode] })
}
