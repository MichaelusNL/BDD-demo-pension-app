## Setup & Running Cypress

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open Cypress test runner: `npm run cypress:open`

## Visit the application

- Open your browser and navigate to `http://localhost:3000`

## Log in

- Use any email
- Fill in the password "bddDemo"

## Route Structure

- "/" or "/login": Login page - this is the entry point of the application
- "/dashboard": Dashboard page with pension calculator

## Workshop important files

The file to extend on in the workshop:
- cypress/e2e/pension-calculation/pension-calculation.feature

The file where you can find the steps (test file):
- cypress/support/step_definitions/common-steps.ts