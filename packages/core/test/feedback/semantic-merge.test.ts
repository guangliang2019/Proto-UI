import { describe, it, expect } from "vitest";
import { mergeTwTokensV0 } from "../../src/spec/feedback/semantic-merge";

describe("feedback.semantic-merge.v0", () => {
  it("last-wins within same semantic group", () => {
    const r = mergeTwTokensV0(["bg-red-500", "bg-blue-500"]);
    expect(r.tokens).toEqual(["bg-blue-500"]);
  });

  it("fallback grouping: unknown tokens only conflict with identical token", () => {
    const r = mergeTwTokensV0(["foo", "bar", "foo"]);
    // group order: foo first, bar second
    // last foo wins => foo, bar
    expect(r.tokens).toEqual(["foo", "bar"]);
  });

  it("output ordering follows first occurrence of each semantic group", () => {
    const r = mergeTwTokensV0(["text-red-500", "bg-red-500", "text-blue-500"]);
    // groups first seen: text-, bg-
    // last-wins: text-blue-500, bg-red-500
    expect(r.tokens).toEqual(["text-blue-500", "bg-red-500"]);
  });

  it("empty input -> empty output", () => {
    const r = mergeTwTokensV0([]);
    expect(r.tokens).toEqual([]);
  });
});
