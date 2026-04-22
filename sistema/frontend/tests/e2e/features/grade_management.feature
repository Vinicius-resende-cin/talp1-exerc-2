Feature: Grade Management
  As an administrator of the student management system
  I want to assign, view, update, and remove grades for students per subject
  So that I can manage academic performance

  Scenario: View student grades matrix
    Given the following students exist
      | id | name         |
      | 1  | Alice Doe    |
      | 2  | Bob Smith    |
    And the following grades have been assigned
      | studentId | subject    | grade |
      | 1         | Math       | MA    |
      | 1         | Science    | MPA   |
      | 2         | Math       | MANA  |
    When I navigate to the "Grades" page
    Then I should see a table displaying a matrix of students and subjects
    And the matrix should show subjects "Math" and "Science" as columns
    And the matrix should display the grade "MA" for student "Alice Doe" under subject "Math"
    And the matrix should display the grade "MANA" for student "Bob Smith" under subject "Math"

  Scenario: Assign a new grade to a student
    Given I navigate to the "Grades" page
    When I fill in the grade assignment form with
      | studentId | subject    | grade |
      | 2         | Science    | MA    |
    And I submit the "Save Grade" button
    Then the matrix should update and display grade "MA" for student "Bob Smith" under subject "Science"

  Scenario: Update an existing grade for a student
    Given the student "Alice Doe" has the grade "MA" for subject "Math"
    When I am on the "Grades" page
    And I fill in the form for "Alice Doe" and subject "Math" with a new grade of "MPA"
    And I click "Save Grade"
    Then the grade matrix should update the cell for "Alice Doe" and "Math" to "MPA"

  Scenario: Remove a grade
    Given the student "Alice Doe" has the grade "MPA" for subject "Science"
    When I am on the "Grades" page
    And I click the remove grade button in the cell for "Alice Doe" and "Science"
    And I confirm the removal
    Then the cell for "Alice Doe" and "Science" should reflect an empty state
