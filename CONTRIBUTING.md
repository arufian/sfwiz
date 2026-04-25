# Contributing to sfwiz

## Bundled documentation corpus

`src/resources/knowledge/` contains pre-bundled markdown documentation shipped with the binary so first-run avoids multi-minute scrapes. The corpus is built from upstream sources retained under their original copyright:

Two subdirs ship pre-bundled:

| Subdir | Upstream source | Copyright |
|--------|-----------------|-----------|
| `apex-ref/` | https://developer.salesforce.com/docs/atlas.en-us.apexref.meta/apexref/ | © Salesforce, Inc. |
| `jsforce/` | https://jsforce.github.io/document/ | © jsforce contributors (MIT) |

The remaining collections (`lwc-guide`, `sf-releases`, `sf-cli-ref`) are fetched at runtime by the `learn worker` because Salesforce's bot protection blocks reliable bulk anonymous scraping.

These files are re-distributed for **local offline agent retrieval inside sfwiz only**. Upstream sources retain canonical authority; the bundled copies may lag by up to 24 h before the background refresh worker syncs them. Do not modify these files manually — changes will be overwritten by the next scrape.

If a Salesforce-side rights holder asks for any subset to be removed, open an issue and we will replace the static bundle with on-demand fetch for that subdir.

## Refresh policy

The background `learn worker` (`src/learn/worker.ts`) refreshes the corpus once per day per host. To force a refresh manually, delete the relevant subdir under `~/.sfwiz/knowledge/` and relaunch.

## Editing rules for this repo

See `CLAUDE.md` § "Coding workflow" + "Hard rules" before opening a PR.
