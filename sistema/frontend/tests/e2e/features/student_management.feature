Feature: Student Management
  As an administrator of the student management system
  I want to be able to register, view, and manage students
  So that I can keep track of all students in the institution

  Scenario: View the list of registered students
    Given the system has the following registered students
      | name       | cpf         | email              |
      | Alice Doe  | 11122233344 | alice@example.com  |
      | Bob Smith  | 55566677788 | bob@example.com    |
    When I navigate to the "Students" page
    Then I should see a table displaying the list of students
    And the student list should contain "Alice Doe" with CPF "11122233344"
    And the student list should contain "Bob Smith" with CPF "55566677788"

  Scenario: Add a new student successfully
    Given I am on the "Students" page
    When I fill in the "Add New Student" form with the following details
      | name       | cpf         | email              |
      | Carol Jane | 99988877766 | carol@example.com  |
    And I click the "Save Student" button
    Then the student "Carol Jane" should be added to the system
    And I should see "Carol Jane" in the student list

  Scenario: Ensure CPF length constraints
    Given I am on the "Students" page
    When I try to add a student with a CPF containing less than 11 digits
    Then the system should prevent the form submission
    And prompt for a valid 11-digit CPF format

  Scenario: Delete a student
    Given the student "Alice Doe" is registered in the system
    And I am on the "Students" page
    When I click the delete button for "Alice Doe"
    And I confirm the deletion
    Then "Alice Doe" should no longer appear in the student list
