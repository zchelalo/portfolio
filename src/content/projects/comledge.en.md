---
project: comledge
locale: en
title: Comledge
summary: An enterprise knowledge platform with versioned articles, publishing, private attachments and permission-aware search.
role: Backend and product
period: '2026 — Present'
status: Private project
order: 2
featured: true
stack:
  - Go
  - React
  - TypeScript
  - PostgreSQL
  - MinIO
  - Playwright
highlights:
  - Access control by type, level and individual article.
  - Search that applies access rules before returning results.
  - An article lifecycle with versions, publishing and archiving.
  - An explicit implementation matrix so partial work is not presented as finished.
---

## Context

Comledge is a private platform for organizing knowledge inside an organization. It brings articles, classifications, versions, publishing, attachments, collections and user administration under one permission system.

The repository is an Nx monorepo with a Go API, a React SPA and a Playwright end-to-end suite. There is no public deployment URL or public source link; this case is documented from the code and a local environment with example data.

## Problem

When organizational knowledge lives in loose documents, three problems appear at once: nobody knows which version is current, there is no consistent way to find it, and not everyone should see the same thing. Publishing a document is easy; governing who reads it, who edits it and which version is active is the real problem.

## Approach

I modeled an article as a piece of knowledge with identity, versions and a publication state. Classification by type and level defines a first access boundary; an article can add its own rules. Search and listings apply those rules in the query instead of fetching results and filtering them in the client.

The work covered authentication, users, roles and permissions, the article lifecycle, Markdown import and export, private attachments, external links, authored collections and auditing of administrative actions.

## Architecture

The API is a modular Go monolith with `article`, `audit`, `auth` and `user` modules. The separation is internal: one deployment, clear domain boundaries and encapsulated data access. The web app uses React, Vite and TanStack Router; PostgreSQL holds the relational model and MinIO provides file storage in development.

Search uses cursor pagination to keep listings stable while articles are published or edited. Attachments are stored as private objects, with metadata and access rules in the database. Exports provide Markdown from the interface and text or PDF over HTTP.

## Decisions

- **Permissions in the query.** Search filters by ACL before pagination. A result the user cannot read must not appear, even if the filter is applied in the client.
- **Two access axes.** Type and level rules reduce repeated configuration; article rules allow specific exceptions.
- **Roles and direct permissions.** Roles group capabilities, but a user can also receive specific global permissions. Password rotation invalidates previously issued tokens through a credential version.
- **Version and publication are separate.** Editing is not publishing. The lifecycle keeps history and allows archiving without deleting content.
- **Cursor pagination.** It avoids duplicates and jumps when the result set changes between pages.
- **Explicit scope.** The repository documentation distinguishes implemented work from partial work. Workflows, custom fields and multi-tenancy are not part of the current delivery.

## Outcomes and status

Comledge covers authentication, users and permissions, articles and versions, publishing, Markdown import, attachments, external links, ACL-aware search and auditing. Some areas remain partial: collection administration and permission definitions do not yet have a complete experience.

The screenshots show a local environment with example data. No organization names, document content, internal endpoints or deployment addresses are published.
