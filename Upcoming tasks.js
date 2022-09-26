// 1. GET STREAMS - 500 nicknames and save their nicknames into newly created object
// structure: allStreams = {nickname: {statistics} }

// 2. GET Get broadcaster Subscription returns information about number of subscriber each channel has. Add this into an allStreams obj and assign to proper nickname

// 3. use TwitchTracker API to get other info like Hours watched in last 30 days, views total in last 30 days.

// All this should make a strong database, that will get 1000 nicknames, then get all needed data, compare them, and return lists of biggest actual streaming channels by:
// - number of subscribers
// - number of views in last 30 days
// - number of followers
// - number of hours watched in last 30 days

// This should form overall statistics home-page with top streams by 4 factors.
// Show best 10 channels and give users a show more button, and load more channels/redirect to statistics page

// Add top live channels on homepage
// Add Most popular games  in last week

// ******* ONCE PER HOUR *******
// - get 2000 streams {steam_id:actual_viewers_count}
// create a DB entry that will store top 50 actual streamers and date, and It will be shown in main page in TOP LIVE STREAMS
// loop through all 2000 streams data, and create an object with games data. Check which games are in top10 most streamed, and most viewer right now, ane show it on main page

// ******* ONCE PER DAY *******
// 1st JOB: get all hourly data from last day, and perform calculations, that will reveal 500 biggest streamers based on peak actual_viewers_count.
// Save 50 nicknames of this calculation into a DB to show it on main page. TOP YESTERDAY STREAMS

// ******* ONCE PER WEEK *******
// Get a list of all daily top streamers from last week, and refine it into a TOP WEEKLY STREAMS based on peak viewers count

// Get all biggest 2000 streamers list from last week, and perform calculations, that will reveal 50 biggest streamers in each category:
// - number of subscribers
// - number of views in last 30 days
// - number of followers
// - number of hours watched in last 30 days
