# Knowledge Corpus (offline pre-bundle)

Markdown corpus shipped with sfwiz so first-run skips multi-minute scrape. At first launch the binary copies these files into `~/.sfwiz/knowledge/` and registers each subdir as a qmd collection. The background `learn worker` (`src/learn/worker.ts`) refreshes pages daily once the binary is online.

## Pre-bundled (offline-ready)

| Collection | Source | Filter | Files |
|------------|--------|--------|-------|
| `jsforce/` | https://jsforce.github.io/document/ | all | 3 |
| `apex-ref/` | Salesforce Apex Developer Reference (https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/) | omit ConnectApi | 828 |

## Runtime-fetched (lazy)

These collections are scraped on demand by `src/learn/docs-fetcher.ts` after first launch. Salesforce Akamai protection blocks reliable bulk anonymous fetch, so they cannot be pre-bundled without paid scraping infrastructure (firecrawl) or headless-browser automation.

| Collection | Source | Strategy |
|------------|--------|----------|
| `lwc-guide` | https://developer.salesforce.com/docs/component-library/documentation/en/lwc | runtime scrape (capped 150 pages) |
| `sf-releases` | https://help.salesforce.com/s/articleView | runtime scrape (capped 40 pages) |
| `sf-cli-ref` | https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/ | runtime scrape via `src/learn/sf-cli-fetcher.ts` |

## License

All Salesforce documentation is © Salesforce, Inc. — re-distributed here for offline agent retrieval inside sfwiz only. Upstream sources retain canonical authority. See top-level `CONTRIBUTING.md` for the full notice.

## Refresh

The `learn worker` overwrites these files once per day with fresher pages from upstream. To force a refresh manually, delete the relevant subdir under `~/.sfwiz/knowledge/` and relaunch sfwiz.
