import { describe, it, expect } from "vitest";
import { z } from "zod";

const schema = z.object({ id: z.string() });

describe("Zod schema", () => {
  it("accepts valid object", () => {
    expect(schema.parse({ id: "123" })).toEqual({ id: "123" });
  });

  it("throws on invalid object", () => {
    expect(() => schema.parse({})).toThrow();
  });

  it("throws on wrong type", () => {
    expect(() => schema.parse("not an object")).toThrow();
  });
});
