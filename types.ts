// Copyright 2023-latest the httpland authors. All rights reserved. MIT license.
// This module is browser compatible.

/** JSON value API. */
export type JsonValue =
  | { [key: string]: JsonValue }
  | JsonValue[]
  | string
  | number
  | boolean
  | null;
