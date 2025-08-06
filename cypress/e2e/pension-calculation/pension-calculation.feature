Feature: Pension Calculation

  @loggedInDashboard
  Scenario: Calculate pension successfully
    When I fill in the field labeled "Maandelijkse inleg (€)" with "250"
    And I fill in the field labeled "Huidige leeftijd" with "27"
    And I fill in the field labeled "Verwacht jaarlijks rendement (%)" with "5"
    And I fill in the field labeled "Verwachte inflatie (%)" with "2"
    And I fill in the field labeled "Huidig pensioenvermogen (€)" with "10000"
    And I click the button labeled "Bereken"
    Then I should see the text "Geschatte maandelijkse pensioenuitkering: €1,903"
    And I click the button labeled "Meer details"
    Then I should see the text "Totale pensioenwaarde: €456,679"
    And I should see the text "Waarde na inflatie (in koopkracht van vandaag): €206,825"
    And I should see the text "Totale inleg: €130,000"
    And I should see the text "Beleggingsgroei: €326,679"
    And I should see the text "Looptijd: 40 jaar"

  @loggedInDashboard
  Scenario: Calculate pension fails due not filling in any fields
    Given the button labeled "Bereken" should be blue
    When I click the button labeled "Bereken"
    Then the button labeled "Bereken" should be red
    And I should see the text "Voer een geldig bedrag in groter dan 0"
    And I should see the text "Voer een geldige leeftijd in groter dan 0"
    And I should see the text "Voer een geldig percentage in voor jaarlijks rendement"
    And I should see the text "Voer een geldig percentage in voor inflatie"
    And I should see the text "Vul alstublieft alle verplichte velden correct in."


