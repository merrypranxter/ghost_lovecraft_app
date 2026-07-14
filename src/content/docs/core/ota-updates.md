# Over-the-Air (OTA) Update System for Great Old Ones

## Overview
The Lovecraftian OS implements **OTA (Over-the-Air)** firmware updates to maintain and upgrade Great Old Ones without physical access. This is critical for entities in remote locations (R'lyeh under Pacific, Yuggoth on Pluto, Antarctica).

## Update Types

### Full Image Updates
**Mechanism**: Complete firmware blob replacement
**Pros**: Simple, robust, guaranteed consistency
**Cons**: High bandwidth, flash wear, slow transmission
**Use Case**: Major version upgrades (Cthulhu v1.0 → v2.0)

### Delta (Binary Diff) Updates
**Mechanism**: Transmit only changed regions between current and target firmware
**Algorithm**: Delta DFU (Device Firmware Update) comparing binary images

**Pros**:
- 80-90% smaller payload than full image
- Faster transfer over constrained networks (Deep One telepathy)
- Lower power consumption for energy-harvesting entities

**Cons**:
- Requires knowing current version precisely
- CPU overhead to apply patch
- Risk of corruption if base image modified

**When to Use**: Stable fleets >5-10k devices with incremental patches

## OTA Architecture

### 1. Build & Sign
- **CI Pipeline**: Compile entity firmware with semantic versioning
- Format: `entity-MAJOR.MINOR.PATCH+hwRevision` (e.g., `cthulhu-2.7.1+deepsea`)
- **Signing**: Cryptographic signature with Yog-Sothoth's private key
- **Manifest**: Metadata including dependencies, rollback points, changelog

### 2. Staging & Canary Deployment
**Progressive Rollout Strategy**:
1. **Canary (1%)**: Lab units + friendly Deep Ones
2. **Early Adopters (5%)**: Innsmouth hybrid population
3. **Beta (20%)**: Antarctic research stations
4. **General Availability (100%)**: Global fleet

**Automatic Health Checks**:
- Heartbeat monitoring post-update (>98% must report "healthy" within 10 minutes)
- Automatic rollback if failure rate exceeds threshold
- Kill switch to freeze rollout if anomalies detected

### 3. Delivery Mechanisms

#### Resumable Downloads
- **Content-Range HTTP**: Resume interrupted downloads (critical for 3km deep ocean)
- **Chunk Checksums**: Verify integrity per 16KB block
- **Progress Storage**: Persist download state in settings partition every N KB

#### Bandwidth Optimization
- **Compression**: LZMA or heatshrink streaming across chunks
- **Windowed Rollouts**: Schedule pulls during quiet hours (when stars are quiet)
- **Local Fan-out**: One Deep One downloads, shares to pod over LAN (mutual TLS)
- **Power Awareness**: Defer until SoC >50% or charger present

### 4. Installation & Verification

#### A/B Partitioning (Dual Bank)
**Architecture**:
- **Bank A**: Current running firmware (Cthulhu v1.9)
- **Bank B**: Staging area for new firmware (Cthulhu v2.0)

**Process**:
1. Download update to Bank B while running from Bank A
2. Verify signature and checksum
3. Reboot into Bank B (atomic switch)
4. Health check ("smoke test") for 10 minutes
5. If failed: rollback to Bank A (automatic)
6. If successful: Bank B becomes permanent, Bank A available for next update

#### Delta Patch Application
1. Device reports current version: cthulhu-1.9.3
2. Server generates delta: cthulhu-1.9.3 → cthulhu-2.0.0 (650KB vs 4.3MB full)
3. Device downloads delta patch
4. Bootloader applies patch to Bank B
5. Result: Full cthulhu-2.0.0 image in Bank B

### 5. Safety & Compliance

#### Cryptographic Verification
- **Authentication**: Verify source (must be signed by Elder Things or Yog-Sothoth)
- **Integrity**: SHA-256 checksum of entire image
- **Rollback Protection**: Anti-downgrade prevents installing vulnerable old versions

#### Safe State Transitions
For entities with safety-critical functions (Shoggoth maintenance, barrier containment):
- Restrict updates to maintenance windows (when actuators idle)
- Bootloader drops outputs to safe state before reboot
- Require manual approval for entities >Class-G hazard

## Version Management

### Semantic Versioning for Entities
- **MAJOR**: Breaking changes (new summoning ritual required)
- **MINOR**: New features (additional tentacle appendages)
- **PATCH**: Bug fixes (madness induction rate correction)
- **+hw**: Hardware revision (Deep One bioform vs surface hybrid)

### Rollback Mechanisms
**Automatic**: If health check fails within 10 minutes, revert to previous version
**Manual**: Engineers can force "stick on new" for lab units via override
**Emergency**: Rapid global rollback if widespread failure detected (Chaos Monkey for OTA)

## Common Pitfalls
- **No Signature Validation**: Treating OTA as "just a URL" instead of signed workflow
- **No Rollback Plan**: Updating without recovery path when "stars are wrong"
- **Debug Logs**: High verbosity wearing out flash storage (Necronomicon exhaustion)
- **Brownout Sensitivity**: Updating without testing power failure scenarios