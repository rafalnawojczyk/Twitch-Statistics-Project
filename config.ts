export const TWITCH_AUTH_API_URL = "https://id.twitch.tv/oauth2/token";
export const MONTHLY_SUMMARY_API_URL = "https://twitchtracker.com/api/channels/summary/";
export const GET_STREAMS_API_URL = "https://api.twitch.tv/helix/streams?first=100";
export const GET_GAMES_API_URL = "https://api.twitch.tv/helix/games/top?first=50";
export const GET_USER_API_URL = "https://api.twitch.tv/helix/users";
export const GET_WEEKLY_SUMMARY_API_URL = "https://twitchtracker.com/api/channels/summary/";
export const GET_USER_FOLLOWERS_API_URL = "https://api.twitch.tv/helix/users/follows?";
export const GET_USER_INFO_URL = "https://api.twitch.tv/helix/users?";
export const FIREBASE_LOGIN_URL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
export const FIREBASE_SINGUP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
export const SERVER = "http://localhost:3000/";
export const EMAIL = "contact@twitchstatistics.com";

export const MAX_TOP_LIVE_CHANNELS = 50;

export const HOURLY_CHANNELS_AMOUNT = 2000;
export const DAILY_CHANNELS_AMMOUNT = 100;
export const HOURLY_TOP_AMOUNT = 50;
export const HOURLY_GAMES_AMMOUNT = 50;
export const WEEKLY_TOP_AMMOUNT = 50;
export const MIN_VIEWERS_AMOUNT = 1;

export const MINIMUM_TOKEN_DURATION_SECONDS = 3600;

export const GAME_THUMBNAIL_WIDTH = 225;
export const GAME_THUMBNAIL_HEIGHT = 300;

export const CHART_DATA_AMOUNT = 168;

export const CHANNEL_THUMBNAIL_WIDTH = 300;
export const CHANNEL_THUMBNAIL_HEIGHT = 300;

export const SERVER_LINK = "http://localhost:3000/";

export const LIVE_BAR_LABELS: {
    type:
        | "activeViewers"
        | "activeChannels"
        | "gamesStreamed"
        | "totalChannels"
        | "peakViewers"
        | "peakChannels";

    title:
        | "Viewers now"
        | "Channels now"
        | "Games now"
        | "Total streamers"
        | "Peak viewers"
        | "Peak channels";
}[] = [
    {
        title: "Viewers now",
        type: "activeViewers",
    },
    { title: "Channels now", type: "activeChannels" },
    { title: "Games now", type: "gamesStreamed" },
    { title: "Total streamers", type: "totalChannels" },
    { title: "Peak viewers", type: "peakViewers" },
    { title: "Peak channels", type: "peakChannels" },
];

export const MONTHS_LABELS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const COLORS_ARRAY = [
    "#a256ee",
    " rgba(158, 161, 250, 1)",
    " rgb(255, 154, 67)",
    " rgb(255, 73, 139)",
    "rgb(118, 249, 202)",
    "rgb(255, 207, 42)",
    "rgb(110, 196, 255)",
    "rgb(141, 250, 148)",
    " rgb(255, 87, 76)",
    " rgb(156, 140, 255)",
];
