import dotenv from "dotenv";

dotenv.config();

module.exports = {
    authEndpoint: process.env.TWITCH_AUTH_API_URL,
    twitchSecret: process.env.TWITCH_CLIENT_SECRET,
    twitchClient: process.env.TWITCH_CLIENT_ID,
    monthlyEndpoint: process.env.MONTHLY_SUMMARY_API_URL,
    streamsEndpoint: process.env.GET_STREAMS_API_URL,
    server: process.env.SERVER,
};
