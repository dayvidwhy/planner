import { format } from "date-fns";

export const formatDateForDisplay = (date: Date): string => {
    return format(date, "PP");
};
