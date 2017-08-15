# OK GROW! Training

Welcome to Advanced GraphQL! In order to make the best use of peoples' time, we ask you to **please take the time to set a few things up before the class. NOTE: If your employer-provided laptop uses a proxy, it may block these services. The best solution is to use a personal laptop which has unrestricted access to the internet. If you are blocked on this, please contact us as soon as possible**.

## For students coming from GraphQL Fundamentals

You will need one more api ([Apollo Engine](https://engine.apollographql.com/)), but you can start with your .env files from the fundamentals class.

You can see that we have also made a few changes to the project:

- The Create React App structure has been "ejected" (we have a webpack config)
- We are therefore able to use .gql files for queries instead of .js
- We have used fragments to standardize query fields between different client GraphQL operations.
- We have split our schema up into multiple files

These changes form a better foundation for advanced GraphQL patterns.

## Setup Success looks like this

You will need to get two dev servers working, one for the GraphQL API, and one for the React UI.

If the `api` server is running correctly, you will see the following at [localhost:4000](http://localhost:4000):

![A correctly configured API server](screenshots/graphql_playground_screenshot.png)

Detailed instructions can be found [here](#API-server-setup)

If the `ui` server is running correctly, you will see the following at [localhost:3000](http://localhost:3000/). Logging in won't work yet

![A correctly configured client app](screenshots/ui_screenshot.png)

Detailed instructions can be found [here](#UI-server-setup)

## About the Class

### Versioning

We’ll use [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to complete exercises.

### Code editor

We recommend [VS Code](https://code.visualstudio.com/) with the following packages installed:

- ESLint
- One of:
  - GraphQL for VSCode (or)
  - GraphQL (newer)
- Prettier - Code formatter

If you prefer to use another editor, please check for corresponding packages.

### Node.js

You’ll need Node.js installed. We recommend the use of [NVM](https://nvm.sh). You can also install it from the [official website](https://nodejs.org). **We’ll use Node 8 (LTS).** The packages are not guaranteed to work with other releases.

Though Node comes with a package manager called npm, we’ll use [Yarn](https://yarnpkg.com), a modern deterministic packager.

## Prerequisite knowledge

We will explore all of this thoroughly during the course, but if you are not comfortable with the following concepts, these links are worth a look.

### JavaScript basics

We won’t cover basic JS syntax. You should know at least how to write a function. If you don’t, please take this free course on [Codecademy](https://www.codecademy.com).

### ES2015+

Recent tools are making good use of the newest features in ES2015 and even ES2016 and ES2017. The newest JavaScript is a joy to use. If you haven't tried these, we hope you'll enjoy getting to know the new JS: http://es6-features.org/

Used in this class

- modules with import/export
- const and let
- arrow functions
- destructuring, rest and spread operators
- template literals (everywhere, but a special use in GraphQL)
- async/await - APIs and Apollo
- Array.concat()

### React

We will be using [React](https://facebook.github.io/react/) to render client components.

One nice thing about React is that it is close to base JS, so you should be able to follow even if you are new to it. Nevertheless, some understanding of it will be highly useful. We will implement the GraphQL integration with [render props](https://reactjs.org/docs/render-props.html). We'll help you if this is new to you.

### Nice to have - GraphQL culture

Some background on GraphQL: “[So what’s this GraphQL thing I keep hearing about?](https://medium.freecodecamp.com/so-whats-this-graphql-thing-i-keep-hearing-about-baf4d36c20cf)”

We will be using [Apollo](https://www.apollographql.com/docs/) for client and server GraphQL operations. You can get a head start by reviewing the documentation, but we will cover everything you need to know during the class.

## Questions before the course starts

Depending on your current level, you can expect to spend up to several hours on this material. It's worth it, and you will get much more from the class. If anything here is confusing or you want to clarify a fine point, please get in touch. We are happy to answer your questions, before, during, and after the class.

Ping us on Twitter:

- Robert Dickert - [@rdickert](https://twitter.com/rdickert)
- Paul Dowman - [@pauldowman](https://twitter.com/pauldowman)

Or email us at [training@okgrow.com](mailto:training@okgrow.com)

## Code Quality

We strive to use best practices in this repo, but we prioritize the learning experience where necessary.

This usually just means a simplified file structure, but this app lacks some safety and security features, so please use your judgment when reusing this code.

If you have any questions or concerns about specific code, please ask us; we love to talk about code quality.

## Detailed setup instructions

### API server setup

```sh
# make a .env file from the example
cp .env.example .env
```

Update the .env file with your api keys:

- `GOOGLE_API_KEY`: `AIzaSyChbaSl5_7bSegq_8Iw9J0RVmYKDZnsgyM` (will be revoked after the training)
- `DARKSKY_API_KEY`: `e64c98928192a2aef399f33014ecb683` (will be revoked after the training)
- [ENGINE_API_KEY](https://engine.apollographql.com/)

```sh
# install the dependencies
yarn

# run the API server
yarn start
```

#### Windows user only - Setting up Mongo

1. Download [MongoDB Community Server from the official website](https://www.mongodb.com/download-center/community)
1. Create a `db` directory in the `api` directory of this repository: `md db`
1. Run Mongo with the following command: `"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath path/to/the/repository/db/folder --port 8082`
1. Add a `MONGO_URL` entry in your `.env` file: `MONGO_URL=mongodb://localhost:8082/database`

#### Reset the database

This is not required for setup, but if you end up with a lot of `place`s while developing or your data gets corrupted, you can reset the db to the default setup with:

```sh
yarn reset-db
```

### UI server setup

> This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

```sh
# make a .env file from the example
cp .env.example .env
```

Update the .env file with your api keys:

- REACT_APP_GOOGLE_API_KEY: use the key you entered in the api folder as GOOGLE_API_KEY

```sh
# install the dependencies
yarn

# run the web server
yarn start
```

## Troubleshooting

If you have issues you can't resolve, please contact us before the class if at all possible. If you resolve your problem, please let us know what you did so we can improve this readme. Here are a some pointers:

- Make sure you are on **Node 8**. Both earlier and later versions may not work as expected.
- MongoDB errors: This app starts MongoDB automatically when you run the api server. If you get MongoDB errors, start by checking your Node version. If it still doesn't work, you can independently install Mongo and run the database with `mongod` before starting the api server.
- external API problems:
  - Make sure you set up .env files in both `api/` and `ui/`. You'll need to restart the servers for changes to take effect.
  - If Google gives you an authorization error, make sure your Google API key includes `geocoding`, and make a new one if not.
  - Make sure your laptop is not blocking outside api calls via a proxy. You may be able to stop the proxy (e.g., in a Vagrant dev setup), but if you can't, you may want to use a personal laptop instead. Contact us if you think this is a blocker for you.
