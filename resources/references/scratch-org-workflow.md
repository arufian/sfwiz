# Scratch Org Workflow

## Create and Set Up
```bash
sf org create scratch --definition-file config/project-scratch-def.json --alias my-scratch --duration-days 7 --set-default
sf project deploy start --target-org my-scratch
sf org assign permset --name MyPermSet --target-org my-scratch
```

## Project Scratch Def Example
```json
{
  "edition": "Developer",
  "features": ["EnableSetPasswordInApi"],
  "settings": {
    "lightningExperienceSettings": { "enableS1DesktopEnabled": true },
    "mobileSettings": { "enableS1EncryptedStoragePref2": false }
  }
}
```

## Retrieve Changes
```bash
sf project retrieve start --target-org my-scratch
```

## Deploy Pipeline
1. `sf project deploy validate` — validate without committing
2. `sf apex run test --test-level RunLocalTests --code-coverage` — verify tests pass
3. `sf project deploy start` — deploy if all green
