import {
    CHANNEL_THUMBNAIL_HEIGHT,
    CHANNEL_THUMBNAIL_WIDTH,
    GAME_THUMBNAIL_HEIGHT,
    GAME_THUMBNAIL_WIDTH,
    MONTHS_LABELS,
} from "../config";

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

export const prepareImage = (
    image: string,
    type: "activeChannels" | "activeGames" | "topChannels"
) => {
    let width = GAME_THUMBNAIL_WIDTH + "";
    let height = GAME_THUMBNAIL_HEIGHT + "";

    if (type === "activeChannels" || type === "topChannels") {
        width = CHANNEL_THUMBNAIL_WIDTH + "";
        height = CHANNEL_THUMBNAIL_HEIGHT + "";
    }

    const changedWidth = image.replace("{width}", width).replace("%7Bwidth%7D", width);

    const finalImage = changedWidth.replace("{height}", height).replace("%7Bheight%7D", height);

    return finalImage;
};

export const numFormatter = (num: number) => {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + "K";
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    }
    return num + "";
};
