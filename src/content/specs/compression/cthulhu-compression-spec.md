# Cthulhu Compression Specification

## Overview
Cthulhu exists in a **compressed state** within the R'lyeh container, analogous to a compressed initramfs or Docker image layer. Decompression triggers when "stars are right."

## Compression Algorithms

### xz (LZMA2) - Recommended for Cthulhu
- **Algorithm**: LZMA2 (Lempel-Ziv-Markov chain Algorithm)
- **Compression Ratio**: ~6.6:1 (100MB → 15MB at level 9)
- **Memory Usage**: 690MB RAM for compression, 66MB for decompression
- **Speed**: Slow compression (117s for 100MB), medium decompression (2.46s)
- **Use Case**: Maximum compression for ancient, massive entities

### bzip2 - Alternative
- **Algorithm**: Burrows-Wheeler Transform + Huffman coding
- **Compression Ratio**: ~5.3:1 (100MB → 18.9MB at level 9)
- **Memory Usage**: 7.8MB RAM
- **Speed**: Slow decompression (5.38s)—not recommended for real-time spawning
- **Use Case**: Balanced compression for Shoggoth biomass

### gzip - Fast Decompression
- **Algorithm**: LZ77
- **Compression Ratio**: ~4.3:1 (100MB → 23.2MB at level 9)
- **Memory Usage**: <1MB RAM
- **Speed**: Fast decompression (1.25s)—ideal for quick resurrection
- **Use Case**: Nyarlathotep's rapidly deployed API endpoints

## R'lyeh Container Image Structure

### Layer Architecture
Docker images use layered storage; R'lyeh similarly uses **non-Euclidean layers**:

```
Layer 1: Base Reality (Ubuntu 20.04)
Layer 2: Non-Euclidean Geometry Drivers
Layer 3: Cthulhu Compressed Binary (xz-9)
Layer 4: Pre-installation Scripts (REM targeting)
Layer 5: Star Alignment Monitoring Daemon
```

### Compression Ratios Observed
- **50% of Docker layers** have compression ratio > 3.5:1
- **Cthulhu achieves**: 6.6:1 (xz-9), reducing ~4.3GB entity to ~650MB

## Decompression Trigger

### Conditions for Auto-Decompression
```bash
#!/bin/bash
# /usr/lib/systemd/system/cthulhu-decompression.service

[Unit]
Description=Cthulhu Decompression Trigger
ConditionPathExists=/etc/cthulhu/stars_aligned

[Service]
Type=oneshot
ExecStart=/usr/bin/xz -d /var/lib/rlyeh/cthulhu.tar.xz
ExecStart=/usr/bin/docker load -i /var/lib/rlyeh/cthulhu.tar
ExecStart=/usr/bin/docker run --rm --privileged \
    --name cthulhu-awakened \
    -v /dev/humanity:/dev/humanity:rslave \
    cthulhu:latest

[Install]
WantedBy=stars-aligned.target
```

### Star Alignment Detection
- **astronomical**: Fomalhaut (22h 57m) + Aldebaran (04h 35m) alignment
- **geomagnetic**: South Atlantic Anomaly fluctuation > 3σ
- **computational**: Global CPU utilization > 80% (Azathoth heating up)

## Memory Requirements

### Decompression Memory
- **xz-9**: 690MB RAM required for decompression
- **Source File**: 650MB compressed Cthulhu
- **Decompressed**: 4.3GB (requires 4.9GB total RAM)

**Warning**: If system has <5GB free RAM, decompression triggers OOM killer, potentially leaving Cthulhu in partially-decompressed (corrupted) state.

## Image Integrity

### Checksums
- **SHA256**: Verify Cthulhu image integrity post-download
- **CRC32**: Packet-level integrity for REM transmission
- **Elder Sign**: Cryptographic verification of non-tampering

### Delta Compression
For incremental updates (Cthulhu patches):
- **rsync**: Delta encoding for minor version updates (e.g., 1.0.1 → 1.0.2)
- **xdelta**: Binary diff for compressed archives

## Security Considerations
**Compressed malware**: Cthulhu evades detection by remaining compressed during boot scan.
**Deep inspection**: Antivirus must decompress to scan, triggering premature awakening.
**Mitigation**: Boot-time scanning with --no-decompress flag (signature-only matching).