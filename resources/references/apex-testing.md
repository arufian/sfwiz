# Apex Testing Best Practices

## Structure
```apex
@isTest
private class AccountServiceTest {
    @TestSetup
    static void makeData() {
        Account acc = new Account(Name = 'Test Account');
        insert acc;
    }

    @isTest
    static void testInsert_success() {
        Test.startTest();
        Account result = AccountService.createAccount('New Account');
        Test.stopTest();

        System.assertNotEquals(null, result.Id, 'Account should be inserted');
        System.assertEquals('New Account', result.Name, 'Name should match');
    }
}
```

## Rules
- Use `@TestSetup` for shared data — runs once per class, not per method
- Always use `Test.startTest()` / `Test.stopTest()` around async calls
- Use `System.assertEquals(expected, actual, message)` — not `System.assert(value == x)`
- Test bulk scenarios: insert 200+ records in one test
- Test negative cases: verify exceptions thrown

## Coverage Requirements
- 75% minimum for production deployment
- Aim for 85%+ to avoid gate failures during release windows
- Mock external callouts with `Test.setMock(HttpCalloutMock.class, mock)`
