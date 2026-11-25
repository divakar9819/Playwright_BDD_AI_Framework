
@login
Feature: Login

  @smoke
  Scenario: Valid user can log in

    Given the user opens the login page
    When the user logs in with email "qa.user@example.com" and password "Password123!"
    Then the user should see the welcome message "Welcome, QA User!"

  @negative
  Scenario Outline: Invalid credentials are rejected

    Given the user opens the login page
    When the user logs in with email "<email>" and password "<password>"
    Then the user should see the login error "Invalid email or password"

    Examples:
      | email                | password       |
      | wrong@example.com    | Password123!   |
      | qa.user@example.com  | WrongPassword! |
      | invalid-email        | Password123!   |
