# Changelog

All notable changes to the Lovecraftian Operating System architecture documentation will be recorded here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- `CHANGELOG.md` to track version history

### Changed
- Reorganized repository into structured subdirectories:
  - `docs/core/` — Core OS documentation (kernel, memory, boot, filesystem, etc.)
  - `docs/nodes/` — Entity-specific documentation (Cthulhu rootkit, Hastur virus)
  - `docs/protocols/` — Protocol specifications (Aklo, REM injection, Dreamlands, non-Euclidean rendering)
  - `data/` — Machine-readable data files (JSON, CSV)
  - `specs/systemd/` — Systemd service and timer unit files
  - `specs/shaders/` — GLSL shader files
  - `specs/compression/` — Compression algorithm specifications
  - `specs/system-calls/` — System call documentation (Necronomicon API)
  - `refs/` — Reference materials and bibliography

### Removed
- `REPOSITORY_STRUCTURE_SUGGESTION.md` — Structure has been implemented

## [0.1.0] - Initial Release

### Added
- `README.md` — Executive summary and project overview
- `ARCHITECTURE.md` — Core system architecture specification
- Core OS documentation: Azathoth CPU, Yog-Sothoth kernel, process management, memory management, boot sequence, filesystem, cryptography, power management, observability, OTA updates, chaos engineering, service mesh, concurrency, scalability, database internals, consensus (Raft), security capabilities
- Entity documentation: Cthulhu rootkit, Hastur virus
- Protocol documentation: Non-Euclidean rendering, Aklo protocol, REM injection, Dreamlands network stack
- Data files: entities, OS layers, coordinates, process table, entity replication, Raft cluster configuration
- Technical specifications: OpenAPI (Nyarlathotep), systemd units, GLSL shader, compression spec, Necronomicon API
- Bibliography and reference materials
