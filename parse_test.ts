import { parseJfv } from "./parse.ts";
import {
  assertEquals,
  assertThrows,
  describe,
  it,
  spy,
  stub,
} from "./_dev_deps.ts";
import { JsonValue } from "./types.ts";
import { assertSpyCallArgs } from "https://deno.land/std@0.182.0/testing/mock.ts";

describe("parseJfv", () => {
  it("should return array of JsonValue", () => {
    const table: [string, JsonValue[]][] = [
      ["", []],
      [`""`, [""]],
      [`"",0,false,null`, ["", 0, false, null]],
      [`["",0,false,null]`, [["", 0, false, null]]],
      [`{}, {}, {}`, [{}, {}, {}]],
      [String.raw`"\u221E"`, ["∞"]],
      [`{"date":"2012-08-25"}`, [{ "date": "2012-08-25" }]],
      [`[17,42]`, [[17, 42]]],
      [`"\\u221E", {"date":"2012-08-25"}, [17,42]`, ["∞", {
        "date": "2012-08-25",
      }, [17, 42]]],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(parseJfv(input), expected);
    });
  });

  it("should throw error", () => {
    const table: string[] = [
      "!",
      "{a: b}",
    ];

    table.forEach((input) => {
      assertThrows(() => parseJfv(input));
    });
  });

  it("should pass bracket wrapped string", () => {
    const parse = spy();
    const Json = stub(JSON, "parse", parse);

    parseJfv("test");
    assertSpyCallArgs(parse, 0, ["[test]"]);

    Json.restore();
  });
});
