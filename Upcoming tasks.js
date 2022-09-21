// Using get streams endpoint get all ongoing streams, get top 1000/ ongoing streams, and save it into DB.
// This should be triggered each hour, and once per day there should be a task, that will check all available data from last days(e.g. 7days or so) and it should return a list of biggest streamers from last X days.
// Return 3 lists - sorted by numer of subscribers, numers of views, and number of followers

// 1. GET STREAMS - 500 nicknames and save their nicknames into newly created object
// structure: allStreams = {nickname: {statistics} }

// 2. GET Get broadcaster Subscription eturns information about number of subscriber each channel has. Add this into an allStreams obj and assign to proper nickname

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
