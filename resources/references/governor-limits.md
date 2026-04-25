# Salesforce Governor Limits Quick Reference

## Per-Transaction Limits (Apex)

| Limit | Value |
|-------|-------|
| SOQL queries | 100 |
| SOQL rows returned | 50,000 |
| DML statements | 150 |
| DML rows | 10,000 |
| CPU time | 10,000 ms (synchronous) / 60,000 ms (async) |
| Heap size | 6 MB (sync) / 12 MB (async) |
| Callouts | 100 per transaction |
| Future calls | 50 per transaction |
| Batch Apex size | 200 records per batch (default) |

## Common Pitfalls
- **SOQL in loops**: query outside loop, store in Map/List
- **DML in loops**: collect records, DML once after loop
- **Governor limits in triggers**: always bulkify, use Trigger.new collections
