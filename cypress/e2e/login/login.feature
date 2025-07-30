Feature: Login

  Scenario: Successful login
    Given I open the page at URL "/login"
    When I fill in the field labeled "Email" with "any@email.com"
    And I fill in the field labeled "Password" with "bddDemo"
    And I click the button labeled "Log In"
    Then I am on a page with URL "/dashboard"

  Scenario: Unsuccessful login
    ## BONUS hier stappen invullen voor een niet succesvolle login
