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

The work covered the clinical and administrative frontend, backend service integration, authentication and authorization flows, file management and exports. Every screenshot in this case was generated with fictional demonstration data.

## Architecture

The frontend uses React, TypeScript, TanStack Router and TanStack Query. The API is organized around a Go gateway and services for authentication, billing, clinical records, files, notifications and location catalogs. The users service uses TypeScript and Drizzle on PostgreSQL.

Services communicate through protobuf-defined gRPC contracts and keep independent databases. RabbitMQ carries events between services; the repository documents eventual-consistency and choreography decisions in its ADRs. Files combine PostgreSQL metadata with S3-compatible storage and pre-signed upload and download URLs.

## Decisions

- **Capability-based boundaries.** Authentication, records, files and billing have separate responsibilities, so each area can evolve without turning the gateway into a logic monolith.
- **Two layers of authorization.** Frontend route guards protect the experience, but access decisions also live in the services. Administrative and clinical flows use distinct guards and permissions.
- **Files outside the database.** The database stores metadata and relationships; binary content lives in object storage and is served through temporary URLs.
- **Server-side reports.** Patient, note and assessment exports are generated in the backend to keep the screen, PDF and XLSX consistent.
- **A local location catalog.** Address suggestions use imported catalogs instead of depending on a geocoding service at runtime.
- **Tests across viewports.** The public frontend route matrix is checked at 320, 768, 1024 and 1440 px to catch overflow and load errors.

## Outcomes and status

NeuraClinic is in production with a public landing at `neuraclinic.app`. The product includes scheduling, patient management, records, notes, assessments and exports that can be verified in the code. No business metrics or real clinical data are published; the gallery images are demonstrations with fictional information.

The natural next step is to deepen observability and operational automation, but those capabilities are not presented here as finished.
