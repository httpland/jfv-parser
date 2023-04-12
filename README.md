# jfv-parser

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/jfv_parser)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/jfv_parser/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/httpland/jfv-parser)](https://github.com/httpland/jfv-parser/releases)
[![codecov](https://codecov.io/github/httpland/jfv-parser/branch/main/graph/badge.svg)](https://codecov.io/gh/httpland/jfv-parser)
[![GitHub](https://img.shields.io/github/license/httpland/jfv-parser)](https://github.com/httpland/jfv-parser/blob/main/LICENSE)

[![test](https://github.com/httpland/jfv-parser/actions/workflows/test.yaml/badge.svg)](https://github.com/httpland/jfv-parser/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@httpland/jfv-parser.png?mini=true)](https://nodei.co/npm/@httpland/jfv-parser/)

**J**SON **F**ield **V**alues for HTTP parser and serializer.

Compliant with
[A JSON Encoding for HTTP Field Values](https://datatracker.ietf.org/doc/html/draft-reschke-http-jfv).

## Parsing

Parse string into [JSON field value](#json-field-value).

```ts
import { parseJfv } from "https://deno.land/x/jfv_parser@$VERSION/parse.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const result = parseJfv(`"\\u221e", {"date":"2012-08-25"}, [17,42]`);

assertEquals(result, ["∞", { "date": "2012-08-25" }, [17, 42]]);
```

According to the specification, always return an array.

### Syntax error

The conditions for throwing an error are the same as for `JSON#parse`.

```ts
import { parseJfv } from "https://deno.land/x/jfv_parser@$VERSION/parse.ts";
import { assertThrows } from "https://deno.land/std/testing/asserts.ts";

assertThrows(() => parseJfv("<invalid:JSON>"));
```

## Serialization

Serialize any array into string.

```ts
import { stringifyJfv } from "https://deno.land/x/jfv_parser@$VERSION/stringify.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const result = stringifyJfv(["∞", { "date": "2012-08-25" }, [17, 42]]);
assertEquals(result, `"\\u221e", {"date":"2012-08-25"}, [17,42]`);
```

According to the specification, encoding into octet sequences using the US-ASCII
character encoding scheme.

### TypeError

The conditions for throwing an error are the same as for `JSON#stringify`.

```ts
import { stringifyJfv } from "https://deno.land/x/jfv_parser@$VERSION/stringify.ts";
import { assertThrows } from "https://deno.land/std/testing/asserts.ts";

const cycle: Record<string, {}> = {};
cycle.deep = { cycle };

assertThrows(() => stringifyJfv([cycle]));
```

## JSON field value

JSON field value is an array of `JsonValue`.

```ts
type JsonValue =
  | { [key: string]: JsonValue }
  | JsonValue[]
  | string
  | number
  | boolean
  | null;
```

## API

All APIs can be found in the
[deno doc](https://doc.deno.land/https/deno.land/x/jfv_parser/mod.ts).

## License

Copyright © 2023-present [httpland](https://github.com/httpland).

Released under the [MIT](./LICENSE) license
