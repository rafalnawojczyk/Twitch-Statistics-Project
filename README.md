# Twitch Statistics Project

[SEE THIS PROJECT LIVE](https://twitch-statistics.vercel.app/)

## Table of contents

-   [General info](#general-info)
-   [Technologies](#technologies)
-   [Setup](#setup)

## General info

This project is an advanced full-stack web application, written in Typescript using Next.js framework. App is fetching data from Twitch API for all live streams, saves them into MongoDB using Next.js API routes, and renders all data in a modern looking charts and tables.

I used in this app various of tools that NextJS provides, such as: 
- ISR - used in probably the most of all pages, because my data is changing each hour, and that the revalidation time, that is triggering site regeneration. This ensures that data is always actual and up to date, and pages are loading surprisingly fast, due to prerendering.
- SSR - I used that tool in one case. It is rendering content for each request, but lets you use your backend API routes. Really solved the problem behind getting tons of data from Twitch API each hour.

![Twitch statistics screenshot](https://github.com/rafalnawojczyk/Twitch-Statistics-Project/blob/master/public/twitch-statistics-screenshot.png?raw=true)

## Technologies

Project is created with:

-   [Next.js](https://nextjs.org/docs/getting-started) Framework built around React, which adds SSG/SSR/ISR, API routes, routing and much more with minimum effort.
-   [React](https://reactjs.org/) UI development library, build with creating reactive apps in Javascript (version: 18.2.0)
-   [Typescript](https://reactjs.org/) Javascript superset, which add static typing to Javascript (version: 4.8.4)
-   [SASS](https://sass-lang.com/) CSS preprocessor, which adds mixins, functions, variables into CSS with ease (version: 1.55.0)
-   [Recharts](https://recharts.org/en-US/) Javascript library, which helps you create great looking charts for your website (version: 2.1.15)
-   [FORMIK](https://formik.org/) Powerfull form-management library for React, that helps in tracking errors, states, changes in all forms (version: 2.2.9)
-   [YUP](https://github.com/jquense/yup) It is a schema builder for runtime value parsing and validation. Great addition to Formik (version:0.32.11)
-   [MongoDB](https://www.mongodb.com/docs/) MongoDB is an easy to use online Database, which helps in storing all important data in ready-to-use formats (version: 4.10.0)
-   [Jest](https://jestjs.io/) Jest is really powerfull testing library, which was used in combination with React Testing Library to make essential unit tests (version: 29.3.1)
-   [Firebase-Auth](https://firebase.google.com/docs/auth/web/start) BaaS service that makes adding user authentication really easy.

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
