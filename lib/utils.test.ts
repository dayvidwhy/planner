import { expect, test } from "vitest";
import { shortName } from "./utils";

test("shortName", () => {
    expect(shortName("John Doe")).toBe("JD");
    expect(shortName("John")).toBe("J");
    expect(shortName("")).toBe("");
    expect(shortName("First Second Third")).toBe("FST");
});

import { formatDateForDisplay } from "./utils";

test("formatDateForDisplay", () => {
    const date = new Date("2022-01-01");
    expect(formatDateForDisplay(date)).toBe("Jan 1, 2022");
});
