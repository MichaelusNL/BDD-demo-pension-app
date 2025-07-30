import { defineParameterType } from '@badeball/cypress-cucumber-preprocessor';

defineParameterType({
    name: 'color',
    regexp: /red|blue|green/,
    transformer: (s) => s,
});
