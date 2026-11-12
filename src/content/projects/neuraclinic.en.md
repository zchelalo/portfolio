---
project: neuraclinic
locale: en
title: NeuraClinic
summary: A SaaS for independent psychologists that brings scheduling, clinical records, notes, assessments and reports into one workflow.
role: Product engineering
period: '2026 — Present'
status: In production
order: 1
featured: true
stack:
  - Go
  - TypeScript
  - React
  - PostgreSQL
  - RabbitMQ
  - AWS
highlights:
  - A clear separation between administrative operations and the clinical workspace.
  - Services organized by capability, with gRPC contracts and dedicated databases.
  - Patient, note and assessment exports generated on the server.
  - File management with database metadata and pre-signed URLs.
links:
  - label: Public site
    href: https://neuraclinic.app
    kind: live
---

## Context

NeuraClinic is a SaaS product for independent psychologists. It connects scheduling, patients, clinical records, notes, psychological assessments, files and reports in a single workflow. The public landing is in production, and the application separates platform administration from clinical work.

## Problem

A small practice often spreads its operation across calendars, documents, messaging and spreadsheets. Each tool keeps part of the context, but a session needs all of it. That fragmentation increases administrative work and makes continuity between appointments harder to maintain.

The challenge was not just adding screens. The product needed a reliable model for patients, appointments, notes, assessments and files without losing traceability, plus a clear boundary between what an administrator can do and what belongs to a psychologist.

## Approach

I treated the patient record as the product's central unit. Scheduling prepares the session, notes document what happened, assessments add follow-up, and reports share information without rebuilding the case from scratch.

The work covered the clinical and administrative frontend, backend service integration, authentication and authorization flows, file management and exports. I also worked on the public landing in Astro: it presents the product, explains the clinical flow and keeps the content in Spanish and English. Every screenshot in this case was generated with fictional demonstration data.

## Architecture

The frontend uses React, TypeScript, TanStack Router and TanStack Query. The API is organized around a Go gateway and services for authentication, billing, clinical records, files, notifications and location catalogs. The users service uses TypeScript and Drizzle on PostgreSQL.

Services communicate through protobuf-defined gRPC contracts and keep independent databases. When a change needs to emit an event, I store the change and the event in the same transaction using the outbox pattern. A relay then publishes those events to RabbitMQ, and the services that need them process the result. For flows that span services, such as creating an attachment, I use saga-style compensations: if a step fails, I release or mark what was already created. That avoids relying on a distributed transaction while keeping intermediate states visible. Files combine PostgreSQL metadata with S3-compatible storage and pre-signed upload and download URLs.

## Decisions

- **Capability-based boundaries.** I separated authentication, records, files and billing so each area can evolve without turning the gateway into a logic monolith.
- **Consistency without distributed transactions.** Each service keeps its own database. Events leave through the outbox, and cross-service flows are compensated when a step fails.
- **Two layers of authorization.** The interface protects navigation, but access decisions are also enforced in the services. Administrative and clinical flows use distinct guards and permissions.
- **Files outside the database.** The database stores metadata and relationships; binary content lives in object storage and is served through temporary URLs.
- **Server-side reports.** I generate patient, note and assessment exports in the backend so the screen, PDF and XLSX share the same source.
- **A local location catalog.** Address suggestions use imported catalogs instead of depending on a geocoding service at runtime.
- **Tests across viewports.** I check the public frontend routes at 320, 768, 1024 and 1440 px to catch overflow and load errors.

## Outcomes and status

NeuraClinic is in production with a public landing at `neuraclinic.app`. The product includes scheduling, patient management, records, notes, assessments and exports. No business metrics or real clinical data are published; the gallery images are demonstrations with fictional information.

The next step is to keep working on observability and operational automation, but those capabilities are not part of what I present here as finished.
