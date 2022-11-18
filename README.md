# Twitch Statistics Project

============

## Table of contents

-   [General info](#general-info)
-   [Technologies](#technologies)
-   [Setup](#setup)

## General info

This project is an advanced full-stack web application, written in Typescript using Next.js framework. App is fetching data from Twitch API for all live streams, saves them into MongoDB using Next.js API routes, and renders all data in a modern looking charts and tables.

## Technologies

Project is created with:

-   Next.js version: 12.3.3
-   React version: 18.2.0
-   Typescript version: 4.8.4
-   SASS version: 1.55.0
-   Recharts version: 2.1.15
-   YUP version: 0.32.11
-   Formik version: 2.2.9
-   MongoDB version: 4.10.0
-   Next-images version: 1.8.4
-   Jest version: 29.3.1
-   Firebase Authentication

## Setup

Clone this repo to your desktop and run this command to install all the dependencies:

```
npm install
```

In the meantime create file named

```
.env.local
```

which will contain all environmental variables. In file you need to include these variables:

```
NODE_ENV=<DEVELOPMENT/PRODUCTION>
TWITCH_CLIENT_ID= <YOUR TWITCH CLIENT ID>
TWITCH_CLIENT_SECRET= <YOUR TWITCH CLIENT SECRET KEY>
DB_CLIENT_ID= <YOUR DB CLIENT ID>
DB_CLIENT_PASSWORD= <YOUR DB CLIENT PASSWORD>
FIREBASE_KEY= <YOUR FIREBASE APP KEY>
```

To finally run application run this command:

```
npm run dev
```
