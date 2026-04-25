# Pre-Deploy Checklist

## Before Any Deployment
- [ ] All Apex tests pass with 75%+ coverage
- [ ] Code review completed (Reviewer persona approved)
- [ ] Validate deploy completed successfully (`sf project deploy validate`)
- [ ] No SOQL injection vulnerabilities
- [ ] No hardcoded IDs in Apex/Flows/LWC
- [ ] Governor limit analysis completed for bulk scenarios

## Production-Specific
- [ ] Deployment window agreed with stakeholders
- [ ] Rollback plan documented
- [ ] Post-deploy smoke test steps defined
- [ ] Monitoring alerts set up

## Common Deploy Failures
| Error | Cause | Fix |
|-------|-------|-----|
| Test coverage < 75% | Insufficient test classes | Add meaningful test coverage |
| Invalid cross-reference | Missing dependency | Check deploy order, include all dependencies |
| Duplicate rule violation | Existing production record | Update instead of insert |
| Field not found | Field not in org | Include field metadata in deploy |
