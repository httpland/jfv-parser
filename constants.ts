// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** Special character. */
export const enum Char {
  Lsqb = "[",
  Rsqb = "]",
  Comma = ",",
  Sp = " ",
  Delimiter = `${Char.Comma}${Char.Sp}`,
  Null = "",
}
