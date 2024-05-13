import { expect, test } from "vitest";
import { generateGUID } from "./guid";

test("generateGUID", () => {
    const guid = generateGUID();

    // Check the total number of segments
    expect(guid.length).toBe(35);

    expect(guid[8]).toBe("-");

    expect(guid[17]).toBe("-");

    expect(guid[26]).toBe("-");

    // Check the length of each segment.
    expect(guid.split("-").length).toBe(4);
});
