# news-scraper

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [API](#api)


## About <a name = "about"></a>

This application scrapes news articles from the [Economist](https://www.economist.com) website.
It's a simple example of how to scrape the web and provide the data to a front-end application. 
The home page lists all the articles scraped in real time. It's a static generated page incrementally updated
every 5 minutes. To read the full article you need to be logged in. It's also and example of how to implement
a simple authentication system using [NextAuth](https://next-auth.js.org/) credentials provider. The guest/guest credentials are hard coded but in a production application you'd use a database and some encryption strategy. 
## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 


### Installing

Clone the repo and run the following commands:

```
npm install
```

To run it locally:

```
npm run dev
```

To test the API locally:

```
npm run test
```

To build it for production:

```
npm run build
```

To run it in production:

```
npm run start
```

## Usage <a name = "usage"></a>

The user experience should be similar to the one in the [economist](https://www.economist.com) website.

Credentials to login:
```
user: guest
password: guest
```

## API <a name = "api"></a>

- **GET** `/api/articles`
- **GET** `/api/articles/:href`

## Known Issues
Jest doesn't support js fetch library. It uses node-fetch but I haven't found a way to type it.
At the moment tests will fail because of that but I'm working on it. The application is working fine though.
The API tests are for predicting when scraping is not working anymore.