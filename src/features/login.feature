Feature: Login
  As a registered user
  I want to sign in
  So that I can access the demo portal

  @smoke @login
  Scenario: Successful login
    Given the user opens the login page
    When the user signs in with email "qa.user@example.com" and password "Password123!"
    Then the user should see the message "Welcome back!"

  @negative @login
  Scenario: Login with invalid credentials
    Given the user opens the login page
    When the user signs in with email "wrong.user@example.com" and password "WrongPassword!"
    Then the user should see the message "Invalid email or password."
