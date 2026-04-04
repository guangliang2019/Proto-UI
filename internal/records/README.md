# Internal Records

This directory is for internal engineering records.

These documents exist to preserve:

- what actually happened
- what problem was observed
- which alternatives were considered
- which decision was taken for now
- what remains open

They are intentionally:

- not normative specifications
- not external-facing engineering guides
- not milestone planning documents

If a decision later stabilizes, the relevant parts should be promoted into one or more of:

- `apps/www/src/content/docs/*/specs`
- `apps/www/src/content/docs/*/engineering`
- contract documents and contract tests

Recommended structure:

1. Context
2. Observed facts
3. Problem statement
4. Decision
5. Rationale
6. Rejected or deferred alternatives
7. Follow-up work

Naming suggestion:

- `YYYY-MM-DD-topic.md`

These records should prefer factual reconstruction over retrospective cleanup.
