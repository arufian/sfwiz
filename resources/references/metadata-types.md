# Common Salesforce Metadata Types

## Apex
| Type | Extension | Directory |
|------|-----------|-----------|
| ApexClass | .cls | classes/ |
| ApexTrigger | .trigger | triggers/ |
| ApexTestSuite | .testSuite | testSuites/ |

## Lightning Web Components
| Type | Extension | Directory |
|------|-----------|-----------|
| LightningComponentBundle | .js/.html/.css | lwc/ |

## Flows
| Type | Extension | Directory |
|------|-----------|-----------|
| Flow | .flow | flows/ |
| FlowDefinition | .flowDefinition | flowDefinitions/ |

## Object & Fields
| Type | Extension | Directory |
|------|-----------|-----------|
| CustomObject | .object | objects/ |
| CustomField | .field | objects/<obj>/fields/ |
| ValidationRule | .validationRule | objects/<obj>/validationRules/ |

## Permissions
| Type | Extension | Directory |
|------|-----------|-----------|
| PermissionSet | .permissionset | permissionsets/ |
| Profile | .profile | profiles/ |

## Retrieve by Metadata Type
```bash
sf project retrieve start --metadata ApexClass:AccountService
sf project retrieve start --metadata LightningComponentBundle:accountCard
```
