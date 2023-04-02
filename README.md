**Introduction**

Welcome to Podcaster, a platform where the best music podcasts from around the globe are gathered.

**How to launch**

After entering the project through any terminal, execute the following commands

```
yarn install #or npm install
yarn start #or npm run start
```

To run the production mode with minified and compressed CSS files

```
yarn start:prod #or npm run start:prod
```

To run the Jest test suite

```
yarn test #or npm test
```

To run the Cypress end-to-end client

```
yarn cypress #or npm cypress
```

To run pre-commit hook manually (you should have pre-commit installed)

```
pre-commit install -f
pre-commit run --all-files
```

**E2E tests**

1. Use `yarn cypress` (or `npm run cypress`) to run the Cypress interface
2. Then press into the "E2E Testing" box
3. You should continue pressing the button "Start E2E testing in Chrome" (or your preferred browser)
4. A window will open with the project testing environment, then press on a test file and it will run the file tests. Try it as many times as you want by pressing the retry button.

Note: Cypress tests may fail if the API takes too long to respond. Also, bear in mind that it runs very fast, so you will have to keep an eye on the trace it has at left side during execution.

## Developer considerations

- I have chosen **not to use any UI component libraries or CSS preprocessors** in order to keep the code as purist as possible and to be able to demonstrate the good implementation of the code in CSS.
- **Multiple loaders** have been configured, both for the navigation load between the different existing pages and a dynamic load for each query to an endpoint, so I recommend testing the DevTools' Network throttling with **Slow 3G** to visualize the loaders at least one time. It is possible that if your computer is too fast it may be very difficult to see the navigation loader appear because, in this case, it depends on the speed at which the javascript is executed in your browser.
- A **generic error page** is displayed for any crashy error through an `ErrorBoundary`, so if you insert a non-existing URL you will be able to see it. Also, the error detail is only displayed in development mode.
- A **custom hook** has been used to collect those requests made in each component in order to use the redirection of https://allorigins.win and also to treat the data, possible errors or the loading itself in a more reactive way.
- The requests made to the podcast API by default already include in the response the **Cache-Control** header with a `stale-while-revalidate=86400`, which implies that the only thing we have to do at UI level is to store this cached data in a variable and return it in case the same call is made. In addition, all podcast information and episodes are stored in the **React Context**.

## Project structure

Within the download you'll find the following directories and files following the `kebab-case` pattern:

```
podcaster-codetest
    ├── public
    ├── src
    │   ├── assets
    │   ├── components
    │   ├── comtext
    │   ├── hooks
    │   ├── models
    │   ├── pages
    │   ├── utils
    │   └── index.js
    ├── .babelrc
    ├── .eslintrc
    ├── .pre-commit-config.yaml
    ├── .prettierrc
    ├── jest.config.ts
    ├── LICENSE
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    └── tsconfig.test.json
```

## Accessibility

DOM code is full of roles and aria-labels so you will have no problem using the app with any voice recognition device or assistant such as Alexa, Siri or Google Assistant. In addition, the `testing-library` library used for all `Jest` tests [recommends the use of ARIA attributes](https://testing-library.com/docs/dom-testing-library/api-accessibility/) to make the tests as reliable as possible to what a real user would do.

## Technology stack

- [React.js](https://es.reactjs.org/) as the Javascript library builded in [Typescript](https://www.typescriptlang.org/) syntax
- [Webpack](https://webpack.js.org/) as the module builder
- [Jest](https://jestjs.io/es-ES/) and [Testing Library](https://testing-library.com/) as the UT and IT Testing framework
- [Cypress](https://www.cypress.io/) as the end-to-end testing tool
- [ESLint](https://eslint.org/) as linter and [Prettier](https://prettier.io/) as code formatter
