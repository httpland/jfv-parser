import { stringifyJfv, stripControlChar } from "./stringify.ts";
import {
  assert,
  assertEquals,
  assertThrows,
  describe,
  it,
  JsonValue,
} from "./_dev_deps.ts";

const reVCHAR = /^[\x21-\x7E]*$/;

describe("stringifySfv", () => {
  it("should only VCHAR", () => {
    const table: JsonValue[][] = [
      ["a"],
      ["abc"],
      ["\t"],
      ["\t\r\n"],
      ["\x00"],
      ["\x01"],
      ["\x02"],
      ["\x03"],
      ["あいう"],
      [{
        "destination": "Münster",
        "price": 123,
        "currency": "€",
      }],
    ];

    table.forEach((input) => {
      assert(reVCHAR.test(stringifyJfv(input)));
    });
  });
  it("should serialize non-ascii escaped string", () => {
    const table: [JsonValue[], string][] = [
      [["a"], `"a"`],
      [["a"], `"a"`],
      [["abc"], `"abc"`],
      [["a\tb"], `"ab"`],
      [["\u2028"], `"\\u2028"`],
      [["\u2029"], `"\\u2029"`],
      [["\f"], `"\\f"`],
      [["\b"], `"\\b"`],
      [[`"`], String.raw`"\""`],
      [["\x5C"], String.raw`"\\"`],
      [["/"], String.raw`"/"`],
      [[`"`], `"\\""`],
      [[`aあ亜`], String.raw`"a\u3042\u4e9c"`],
      [
        [{
          "destination": "Münster",
          "price": 123,
          "currency": "€",
        }],
        String
          .raw`{"destination":"M\u00fcnster","price":123,"currency":"\u20ac"}`,
      ],
      [
        ["http://test.test"],
        `"http://test.test"`,
      ],
      [
        ["http://test.test", "test"],
        `"http://test.test", "test"`,
      ],
      [[{}, {}], `{}, {}`],
      [["a\tb\rc\n"], `"abc"`],
      [
        ["∞", { "date": "2012-08-25" }, [17, 42]],
        `"\\u221e", {"date":"2012-08-25"}, [17,42]`,
      ],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(stringifyJfv(input), expected);
    });
  });

  it("should throw error if the input is invalid JSON", () => {
    // deno-lint-ignore ban-types
    const a: Record<string, {}> = {};

    a.b = { b: a };

    assertThrows(() => stringifyJfv([a]));
  });
});

describe("stripControlChar", () => {
  it("should return stripped string", () => {
    const table: [string, string][] = [
      ["", ""],
      [String.raw`\t\t\t`, ""],
      [String.raw`\t\r\nabc`, "abc"],
      [String.raw`\b\c\dabc`, String.raw`\b\c\dabc`],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(stripControlChar(input), expected);
    });
  });
});
