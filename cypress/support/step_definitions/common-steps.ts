import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I open the page at URL {string}', (url: string) => {
    cy.visit(url);
});

Given('I am on a page with URL {string}', (url: string) => {
    cy.visit(url);
});

Given('I am logged in', () => {
    cy.fixture('user').then(({ email, password }) => {
        cy.visit('/login');
        cy.get('input[type="email"]').type(email);
        cy.get('input[type="password"]').type(password);
        cy.get('form').submit();
        cy.url().should('include', '/dashboard');
    });
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
