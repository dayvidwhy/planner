import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
};

export const shortName = (username: string) => {
    if (username) {
        return username.split(" ").map((n) => n[0]).join("");
    }
    return "";
};

import { format } from "date-fns";

export const formatDateForDisplay = (date: Date): string => {
    return format(date, "PP");
};
