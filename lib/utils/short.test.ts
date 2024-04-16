import { expect, test } from "vitest";
import { shortName } from "./short";

test("shortName", () => {
    expect(shortName("John Doe")).toBe("JD");
    expect(shortName("John")).toBe("J");
    expect(shortName("")).toBe("");
    expect(shortName("First Second Third")).toBe("FST");
});
