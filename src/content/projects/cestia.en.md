---
project: cestia
locale: en
title: Cestia
summary: An app for recording personal and shared purchases, with lists, groups, invitations and a history of real contributions.
role: Backend and product
period: '2026 — Present'
status: In production
order: 3
featured: false
stack:
  - Go
  - React
  - TypeScript
  - PostgreSQL
  - sqlc
  - Terraform
highlights:
  - Real purchases with purchaser, payer and item context.
  - Groups and invitations without debts, balances or settlements.
  - Idempotency and version checks for purchases, corrections and reversals.
  - An activity history that shows who did what.
links:
  - label: Application
    href: https://cestia.chelalo.me
    kind: live
---

## Context

Cestia is an app for personal and shared purchases. It lets people create lists, organize them into groups, invite others, record the actual price of each item, note who bought and who paid, and review a history of contributions.

The product starts from a deliberate decision: **it does not calculate debts, balances, splits or settlements**. It records real expenses and their context; it does not turn a shared purchase into an amount owed.

## Problem

Purchases in a household or a group often end up in a message thread. It becomes unclear what is still missing, what it actually cost and who covered each payment. Shared-expense apps tend to assume that the goal is to split a debt, adding a calculation layer that not every group needs.

Cestia separates two questions: what was bought, and who contributed the money. The group keeps useful information without being forced into a settlement policy.

## Approach

The model revolves around lists and items. A personal list can belong to a group; members receive invitations and participate according to their access. Each item records a purchase with actual unit price, quantity, purchaser, payer and date.

Purchases can be corrected or reversed without erasing the trail. That decision forces every operation to be treated as an auditable event rather than a simple row update.

## Architecture

Cestia is an Nx monorepo with a Go API and a React and TypeScript SPA. PostgreSQL holds the model and sqlc generates the queries. Production runs on Lightsail with PostgreSQL on an attached disk, S3 backups, SES email and deployments through GitHub Actions with OIDC.

## Decisions

- **Explicit money domain.** I validate and normalize prices before storing them; arbitrary strings are never treated as money.
- **Idempotency.** Recording, correcting or reversing a purchase requires an idempotency key, preventing duplicates when a client retries.
- **Version checks.** Each operation verifies the item's expected version and returns a conflict if it changed, instead of overwriting recent work.
- **History as part of the model.** Actions are recorded as activity with actor, context and payload. Traceability is not reconstructed later.
- **No balances.** There is no debt table or settlement calculation. History shows contributions, not obligations.
- **Desktop and mobile tests.** Playwright walks through sign-up, email verification, purchases and groups in both layouts.

## Outcomes and status

Cestia is deployed at `cestia.chelalo.me`. It includes verified accounts, personal lists, groups, invitations, purchase recording and correction, expenses and history. The screenshots in this case come from the application running in a local environment with fictional accounts and data; no real production data is published.

The product keeps growing. Purchases, permissions and history are already in production, and the next improvements build on that same model.
