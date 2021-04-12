Feature: Example

    @reporLogin
    Scenario Outline: Just an example feature file
        Given Reporting application is launched and logged in as "<loginType>" user
        And Verify report home page is displayed

        Examples:
            | loginType |
            | anonymous |