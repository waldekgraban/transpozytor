export type Ok<T> = { readonly kind: 'ok'; readonly value: T };
export type Err<E> = { readonly kind: 'err'; readonly error: E };

export type Result<T, E> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => ({ kind: 'ok', value });

export const err = <E>(error: E): Err<E> => ({ kind: 'err', error });

export const isOk = <T, E>(result: Result<T, E>): result is Ok<T> => result.kind === 'ok';

export const isErr = <T, E>(result: Result<T, E>): result is Err<E> => result.kind === 'err';
