// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

import { Char } from "./constants.ts";
import type { JsonValue } from "./types.ts";

/** Parse string into array of {@link JsonValue}.
 *
 * @example
 * ```ts
 * import { parseJfv } from "https://deno.land/x/jfv_parser@$VERSION/parse.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const result = parseJfv(`"\\u221e", {"date":"2012-08-25"}, [17,42]`);
 *
 * assertEquals(result, ["∞", { "date": "2012-08-25" }, [17, 42]]);
 * ```
 *
 * @throws {SyntaxError} If the string to parse is not valid JSON.
 */
export function parseJfv(input: string): JsonValue[] {
  /** Specification:
   * 1. combine all field line values into a single field value as per Section 5.3 of [HTTP],
   * 2. add a leading begin-array ("[") octet and a trailing end-array ("]") octet, then
   * 3. run the resulting octet sequence through a JSON parser.
   */

  input = Char.Lsqb + input + Char.Rsqb;

  return JSON.parse(input);
}
