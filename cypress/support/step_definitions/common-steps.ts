import {Given, When, Then, Before} from '@badeball/cypress-cucumber-preprocessor';

Before({ tags: '@loggedInDashboard' }, () => {
    cy.fixture('user').then(({ email, password }) => {
        cy.visit('/login');
        cy.get('input[type="email"]').type(email);
        cy.get('input[type="password"]').type(password);
        cy.get('form').submit();
        cy.url().should('include', '/dashboard');
    });
});

Given('I open the page at URL {string}', (url: string) => {
    cy.visit(url);
});

Given('I am on a page with URL {string}', (url: string) => {
    cy.location('pathname').should('eq', url);
});

When('I fill in the field labeled {string} with {string}', (label: string, value: string) => {
    cy.contains('label', label)
        .invoke('attr', 'for')
        .then(id => {
            cy.get(`#${id}`).clear().type(value);
        });
});

When('I click the button labeled {string}', (buttonText: string) => {
    cy.contains('button', buttonText).click();
});

Then('I should see the text {string}', (text: string) => {
    cy.contains(text).should('exist');
});

Then(
    'the button labeled {string} should be {color}',
    (label: string, expectedColor: 'red' | 'blue' | 'green') => {
        const colorMap: Record<'red' | 'blue' | 'green', string> = {
            red: 'rgb(211, 47, 47)',
            blue: 'rgb(25, 118, 210)',
            green: 'rgb(46, 125, 50)',
        };

        cy.contains('button', label)
            .and('have.css', 'background-color', colorMap[expectedColor]);
    }
);
