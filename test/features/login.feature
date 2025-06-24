Feature: Login Functionality
  As a user
  I want to be able to log in to the manga reading website
  So that I can access my account and read manga

  Background:
    Given I am on the login page

  Scenario: Successful login with valid credentials
    When I enter valid username and password
    And I click the login button
    Then I should be logged in successfully
    And I should see my username displayed

  Scenario: Login with credentials containing leading/trailing spaces
    When I enter username with leading/trailing spaces
    And I enter password with leading/trailing spaces
    And I click the login button
    Then I should be logged in successfully
    And I should see my username displayed

  Scenario: Login with uppercase username
    When I enter uppercase username
    And I enter valid password
    And I click the login button
    Then I should be logged in successfully
    And I should see my username displayed

  Scenario: Login with empty username
    When I leave username field empty
    And I enter valid password
    And I click the login button
    Then I should see username required error message

  Scenario: Login with empty password
    When I enter valid username
    And I leave password field empty
    And I click the login button
    Then I should see password required error message

  Scenario: Login with empty username and password
    When I leave username field empty
    And I leave password field empty
    And I click the login button
    Then I should see username required error message
    And I should see password required error message

  Scenario: Login with invalid username
    When I enter invalid username
    And I enter valid password
    And I click the login button
    Then I should see invalid credentials error message

  Scenario: Login with invalid password
    When I enter valid username
    And I enter invalid password
    And I click the login button
    Then I should see invalid credentials error message

  Scenario: Login with email instead of username
    When I enter valid email
    And I enter valid password
    And I click the login button
    Then I should see invalid credentials error message

  Scenario: Login with SQL injection attempt in username
    When I enter SQL injection string in username
    And I enter valid password
    And I click the login button
    Then I should see invalid credentials error message

  Scenario: Login with SQL injection attempt in password
    When I enter valid username
    And I enter SQL injection string in password
    And I click the login button
    Then I should see invalid credentials error message

  Scenario: Login button shows loading spinner
    When I enter valid username and password
    And I click the login button
    Then I should see loading spinner
    And I should be logged in successfully

  Scenario: Tab order is correct on login form
    When I click on username field
    And I press tab key
    Then password field should be focused
    When I press tab key again
    Then login button should be focused

  Scenario: Multiple failed login attempts lock account
    When I attempt to login with invalid credentials 10 times
    Then I should see account locked error message

  Scenario: Login session persists after page refresh
    When I login with valid credentials
    And I refresh the page
    Then I should remain logged in

  Scenario: Remember Me functionality keeps user logged in
    When I login with remember me checked
    And I simulate browser restart
    Then I should be automatically logged in

  Scenario: Login session does not persist without Remember Me
    When I login without remember me checked
    And I simulate browser restart
    Then I should be logged out

  Scenario: Cursor changes to text over input fields
    When I hover over username field
    Then cursor should be text type 