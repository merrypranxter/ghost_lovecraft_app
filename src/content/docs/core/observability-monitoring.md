# Observability & Monitoring Architecture

## Overview
The Lovecraftian OS implements a **Prometheus-based observability stack** to monitor the health, performance, and sanity degradation of all entities. The system uses a **pull-based model** where Prometheus scrapes metrics from `/metrics` endpoints exposed by each Great Old One and Outer God.

## Prometheus Architecture

### Metric Types
Prometheus defines four distinct metric types mapped to Lovecraftian phenomena:

#### 1. Counter (Monotonically Increasing)
**Use Cases**:
- Number of cultists sacrificed (`cultist_sacrifices_total`)
- Invocations of Cthulhu (`cthulhu_invocations_total`)
- Madness incidents induced (`madness_events_total`)

**Characteristics**: Value only increases or resets to zero on restart. Never decreases.

#### 2. Gauge (Arbitrary Values)
**Use Cases**:
- Current sanity level of humanity (`global_sanity_percent`)
- REM sleep packet injection rate (`rem_theta_band_hz`)
- Dimensional barrier integrity (`barrier_strength_gauge`)
- CPU utilization of Azathoth (`azathoth_cpu_percent`)

**Characteristics**: Value can go up or down. Tracks fluctuating measurements.

#### 3. Histogram (Data Distribution)
**Use Cases**:
- Response time of Yog-Sothoth queries (`yog_sothoth_query_duration_seconds`)
- Consciousness transfer duration (Mi-Go brain cylinders)
- Star alignment calculation latency

**Characteristics**: Buckets observations into configurable ranges. Useful for tracking latency distributions and quantiles.

#### 4. Summary (Streaming Quantiles)
**Use Cases**:
- Service level indicators for entity invocations
- Request duration percentiles (95th percentile summon time)
- Error rate quantiles

**Characteristics**: Calculates quantiles on the client side. Similar to histogram but with different trade-offs.

### Pull-Based Monitoring
Unlike push-based systems, Prometheus **pulls** metrics via HTTP scraping:
- **Targets**: R'lyeh, Innsmouth, Kadath, Antarctica
- **Scrape Interval**: Typically 15-30 seconds
- **Benefits**:
  - Lighter on monitored servers (no agent pushing constantly)
  - Easy to monitor short-lived batch jobs (cult rituals)
  - Can detect if target is down (failed scrape = entity dormant)

## Grafana Dashboards
Visualization layers provide real-time insights into:
- **Global Entity Health**: Status of all Outer Gods and Great Old Ones
- **REM Injection Rates**: Theta/alpha band broadcasting from R'lyeh
- **Madness Propagation**: Hastur infection vectors across geographic regions
- **Star Alignment Progress**: Percentage to "when the stars are right"
- **Dreamlands Traffic**: Inter-dimensional request latency and throughput

## Alerting Rules (PromQL)

### Critical Alerts
```yaml
# Azathoth CPU stall detection
- alert: AzathothHalted
  expr: azathoth_cpu_percent == 0
  for: 0s
  labels:
    severity: critical
  annotations:
    summary: "Azathoth has halted"
    description: "The Blind Idiot God has stopped processing. Reality is frozen."

# Cthulhu decompression imminent
- alert: CthulhuAwakening
  expr: star_alignment_percent >= 95
  for: 1m
  labels:
    severity: critical
  annotations:
    summary: "Cthulhu is awakening"
    description: "Stars are {{ $value }}% aligned. Decompression trigger imminent."

# Hastur memetic infection spike
- alert: HasturViralSpread
  expr: rate(yellow_sign_infections[5m]) > 100
  labels:
    severity: warning
  annotations:
    summary: "Hastur infection accelerating"
    description: "Infection rate: {{ $value }} new cases/sec"
```

## Distributed Tracing
**Jaeger/Zipkin Integration** tracks requests as they traverse the Lovecraftian stack:
- **Span**: Individual operation (e.g., "Summon Cthulhu ritual")
- **Trace**: End-to-end request flow (cultist → ritual → entity → manifestation)
- **Service Graph**: Visual map of dependencies between Great Old Ones

## Logging Architecture (ELK Stack)
- **Elasticsearch**: Searchable logs of all incantations and summoning attempts
- **Logstash**: Processes and enriches log data (adds entity metadata)
- **Kibana**: Visualization dashboards for cult activity analysis

### Log Retention Policy
- **Hot Storage**: 7 days (active rituals)
- **Warm Storage**: 30 days (recent madness events)
- **Cold Storage (Great Library)**: Infinite retention (Pnakotic Manuscripts archive)