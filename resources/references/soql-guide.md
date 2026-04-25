# SOQL Quick Reference

## Basic Syntax
```soql
SELECT Id, Name, AccountId FROM Contact WHERE AccountId != null ORDER BY Name LIMIT 200
```

## Relationships
```soql
-- Parent (child to parent dot notation)
SELECT Account.Name FROM Contact

-- Child (subquery)
SELECT Name, (SELECT Subject FROM Cases) FROM Account
```

## Aggregate Functions
```soql
SELECT COUNT(Id), SUM(Amount), AccountId FROM Opportunity GROUP BY AccountId
```

## SOQL Injection Prevention
```apex
// UNSAFE
String query = 'SELECT Id FROM Account WHERE Name = \'' + userInput + '\'';

// SAFE: String.escapeSingleQuotes
String safe = 'SELECT Id FROM Account WHERE Name = \'' + String.escapeSingleQuotes(userInput) + '\'';

// BEST: Bind variables
List<Account> accs = [SELECT Id FROM Account WHERE Name = :userInput];
```

## Performance Tips
- Use `WHERE` clauses on indexed fields (Id, Name, ExternalId, standard lookup fields)
- Avoid `LIKE '%...'` (leading wildcard disables index)
- Use `LIMIT` to avoid heap overflow
- Selective queries: < 10% of records or < 333,333 rows for non-selective
