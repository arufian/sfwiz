# Salesforce Security Checklist

## CRUD/FLS Enforcement
```apex
// Check object-level access
if (!Schema.sObjectType.Account.isAccessible()) {
    throw new SecurityException('No read access to Account');
}

// Check field-level access
if (!Schema.sObjectType.Account.fields.Name.isAccessible()) {
    throw new SecurityException('No read access to Account.Name');
}

// Automatic enforcement (preferred in API v50+)
List<Account> accs = [SELECT Id, Name FROM Account WITH SECURITY_ENFORCED];
```

## Sharing Model
- `with sharing` — respect the user's sharing rules (use for UI-facing Apex)
- `without sharing` — bypass sharing (use ONLY for system-level operations, internal only)
- `inherited sharing` — inherits from calling class (safe for utility classes)

## SOQL Injection
Use bind variables or `String.escapeSingleQuotes()` — never string concatenation.

## Stored Credentials
- Never hardcode API keys in Apex
- Use Named Credentials or Custom Metadata / Custom Settings for endpoints
- Use Platform Events or Secrets Manager for sensitive values
