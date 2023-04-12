// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { ascii } from "./deps.ts";
import { Char } from "./constants.ts";
import type { JsonValue } from "./types.ts";

/** Serializer array of {@link JsonValue} into string.
 *
 * @throws {TypeError} If input contains a circular reference.
 */
export function stringifyJfv(input: readonly Readonly<JsonValue>[]): string {
  /** Specification:
   * 1. generating the JSON representation,
   * 2. stripping all JSON control characters (CR, HTAB, LF), or replacing them by space ("SP") characters,
   * 3. replacing all remaining non-VSPACE characters by the equivalent backslash-escape sequence ([RFC8259], Section 7).
   *
   * The resulting list of strings is transformed into an HTTP field value by combining them using comma (%x2C) plus optional SP as delimiter,
   * and encoding the resulting string into an octet sequence using the US-ASCII character encoding scheme ([RFC0020]).
   */

  const result = input
    .map(stringifyJSON)
    .map(stripControlChar)
    .map(ascii.escapeNonAsciis)
    .join(Char.Delimiter);

  return result;
}

/**
 * ```abnf
 * control-characters = CR / HTAB / LF
 * ```
 */
const reControl = /(?:\\t)|(?:\\r)|(?:\\n)/g;

/** Remove control characters from input. */
export function stripControlChar(input: string): string {
  return input.replace(reControl, Char.Null);
}

function stringifyJSON(input: unknown): string {
  return JSON.stringify(input);
}
