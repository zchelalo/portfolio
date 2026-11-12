---
project: chaoslab
locale: en
title: ChaosLab
summary: A Go CLI that generates HTTP load against local services and makes concurrency, limits and cancellation observable.
role: Personal project
period: '2026 — Present'
status: Evolving
order: 4
featured: false
stack:
  - Go
  - HTTP
  - Concurrency
  - Testing
highlights:
  - A sequential baseline to measure before optimizing.
  - An HTTP client with a timeout, response limit and redirects disabled.
  - A deliberate restriction to `127.0.0.1` and at most 20 requests.
  - A roadmap kept separate from what the CLI already runs.
---

## Context

ChaosLab is a personal lab for learning Go concurrency by building an HTTP load tool. The goal is not to compete with a commercial load tester, but to understand the full request lifecycle, resource limits and cancellation decisions that are often hidden behind an interface.

The project grows in levels: a measurable sequential baseline first, then bounded concurrency, cancellation and metrics. A local fault-injection proxy and a TUI are later extensions, not MVP requirements.

## Problem

Load tools often show a result without explaining what is being measured. To learn, I needed a small CLI where every limit was explicit: how many requests are accepted, how large a response can grow, what happens on a timeout, and how a transport error differs from an unsuccessful HTTP response.

I also needed a clear safety boundary. Generating traffic against third-party services without authorization is not acceptable, so the tool rejects destinations that are not local.

## Approach

The first version performs sequential requests and classifies results. That baseline makes any future optimization comparable to an understandable reference. Concurrent generation exists in the internal layer with `sync.WaitGroup`, but it is not exposed in the CLI yet; this case therefore presents it as internal work, not as an available feature.

Safety and measurement were designed before speed: URL validation, body limits and timeouts belong to the HTTP client; result classification belongs to the load domain.

## Architecture

The implementation uses the Go standard library. `cmd/main.go` parses `-url` and `-requests`, builds the client and generator, runs the load and prints a summary. `internal/httpclient` encapsulates the transport; `internal/load` contains execution and classification.

The client sets a two-second timeout, caps body reads at 1 MB and disables redirects so it cannot follow a URL outside the authorized destination. The generator validates the `http` scheme, a `127.0.0.1` host and a request count between 1 and 20.

## Decisions

- **Measure before optimizing.** Sequential execution is the baseline. Without it, comparing concurrency would be only an impression.
- **Visible limits.** The request maximum and response size are part of the contract, not internal details.
- **Fail explicitly.** An invalid URL, a disallowed scheme or an external host is rejected before any traffic is sent.
- **Useful classification.** The summary distinguishes successful responses, unsuccessful HTTP responses, request failures and incomplete responses caused by reads or size.
- **Aggregate time, not wall time.** `Total Elapsed Time` sums individual durations. It must not be read as the total duration of a concurrent run.
- **Interface after correctness.** The TUI and proxy wait until the core is correct and testable.

## Outcomes and status

**Available today:** a CLI with `-url` and `-requests`, sequential execution, a bounded HTTP client and a classified summary.

**Implemented internally:** concurrent generation with `WaitGroup`, not yet exposed as a CLI option.

**Conceptual:** a configurable worker pool, context cancellation, percentiles, a fault-injection proxy and a TUI. The terminal on this page is an output illustration, not a real measurement.

The repository is not linked because its public visibility is not confirmed. The project's evolution is documented as a roadmap, not as delivered functionality.
