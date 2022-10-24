import { MONTHS_LABELS } from "../config";

export const getFormattedDate = (date: Date) => {
    const hours = (date.getHours() + "").padStart(2, "0") + ":00";
    const day = date.getDate();
    const month = MONTHS_LABELS[date.getMonth()].substring(0, 3);
    const year = date.getFullYear();
    return `${day} ${month}, ${year} ${hours}`;
};

export const getLanguage = (code: string) => {
    const lang = new Intl.DisplayNames(["en"], { type: "language" });
    return lang.of(code);
};
