# Cypress E2E Test Project

This project uses [Cypress](https://www.cypress.io/) for end-to-end testing of a web application.

## 📦 Installation

````bash
npm install

Note: If Cypress fails to start on Ubuntu (e.g., missing libnss3, libasound2, etc.), install the following packages:

sudo apt install libnss3 libasound2 libgtk-3-0 libxss1 libatk-bridge2.0-0 libdrm2 libxshmfence1 libxdamage1 libgbm1

Configuration (cypress.env.config.ts)

baseUrl: Set to https://www.saucedemo.com/

Viewport dimensions (e.g. 1280x720)

Timeouts configured globally

chromeWebSecurity disabled to avoid cross-origin issues

Custom Cypress tasks registered for extended functionality

## Running Tests

Clone the project

```bash
  git clone https://link-to-project
````

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

To open Cypress Test Runner UI:

```bash
npm run cy:open
```

To run tests headlessly in the terminal:

```bash
npm run cy:run
```

🌐 Technology Stack
Cypress v14

TypeScript

ESLint for code quality and linting

Utility libraries:

- dayjs for date/time handling

- cypress-recurse for recursive retries in tests

- cypress-log-to-output for enhanced CLI logging
