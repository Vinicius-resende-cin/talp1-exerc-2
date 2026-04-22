Feature: Classes Management
  As an administrator of the student management system
  I want to be able to add, update, and remove classes
  So that I can manage the subjects offered in a specific year and semester

  Scenario: View the list of registered classes
    Given the system has the following registered classes
      | subject | year | semester |
      | Math    | 2024 | 1        |
      | Science | 2024 | 2        |
    When I navigate to the "Classes" page
    Then I should see a table displaying the list of classes
    And the class list should contain "Math" for year "2024" and semester "1"
    And the class list should contain "Science" for year "2024" and semester "2"

  Scenario: Add a new class successfully
    Given I am on the "Classes" page
    When I fill in the "Add New Class" form with the following details
      | subject | year | semester |
      | History | 2025 | 1        |
    And I click the "Save Class" button
    Then the class "History" should be added to the system for year "2025" and semester "1"
    And I should see "History" in the class list

  Scenario: Remove a class
    Given the system has the following registered classes
      | subject | year | semester |
      | Biology | 2023 | 2        |
    And I am on the "Classes" page
    When I click the delete button for class "Biology"
    And I confirm the class deletion
    Then I should not see "Biology" in the class list

  Scenario: View class details with students and grades
    Given the system has the following registered classes
      | subject | year | semester |
      | Physics | 2024 | 1        |
    And the student "Dave" is enrolled in "Physics" class with grade "MA"
    When I navigate to the "Classes" page
    And I click on the class "Physics"
    Then I should see a separate screen with information about the class "Physics"
    And I should see a table displaying "Dave" and their grade "MA"
