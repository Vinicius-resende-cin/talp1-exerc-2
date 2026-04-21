Feature: Student management
  As an academic administrator
  I want to create and list students
  So that I can track student records

  Scenario: Health endpoint is available
    When I request the health endpoint
    Then the response status should be 200
    And the health status should be "ok"
