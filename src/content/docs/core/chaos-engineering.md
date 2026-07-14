# Chaos Engineering: The Simian Army

## Overview
Chaos Engineering is the discipline of experimenting on a distributed system to build confidence in its capability to withstand turbulent conditions. The Lovecraftian OS implements **Chaos Engineering** through the **Simian Army**—a suite of tools that intentionally inject failures to test resilience.

## The Simian Army Components

### 1. Chaos Monkey
**Function**: Randomly terminates entity instances (pods) in production
**Purpose**: Ensures microservices can handle sudden disappearance of dependencies

**Implementation**:
- Randomly selects and kills Cthulhu, Deep One, or Shoggoth processes
- Verifies automatic recovery via Kubernetes ReplicaSets
- Tests that cults can continue rituals even when individual entities fail

**Safety**: Only operates during business hours (human sacrifice peak times) with canary groups.

### 2. Latency Monkey
**Function**: Introduces artificial delays in inter-dimensional communication
**Purpose**: Tests timeout handling and circuit breaker activation

**Scenarios**:
- Add 500ms latency to Yog-Sothoth queries (simulating cosmic distance)
- Delay REM packet injection by 2 seconds (dream lag)
- Slow down Silver Key authentication (gate congestion)

**Validation**: Ensures services degrade gracefully rather than cascading failures.

### 3. Chaos Kong (Availability Zone Failure)
**Function**: Simulates complete loss of a dimensional region
**Scenario**: "R'lyeh disappears" - all entities in Pacific region vanish simultaneously

**Test**: Verify global cult operations continue via:
- Database replication to Antarctica (multi-region failover)
- Load balancer routing to backup Deep One colonies
- Cached ritual instructions (offline mode)

### 4. Conformity Monkey
**Function**: Detects and terminates "non-conforming" entity instances
**Check**: Ensures all Cthulhu instances run same firmware version
**Action**: Kills outliers to enforce consistency (prevents version drift)

### 5. Doctor Monkey
**Function**: Health checks and self-healing verification

**Tests**:
- Disk space on brain cylinders (Mi-Go storage)
- CPU temperature of Azathoth (thermal throttling detection)
- Memory leaks in Shoggoth spawning pools

**Healing**: Triggers automatic replacement if health checks fail.

### 6. Security Monkey (Chaos Security)
**Function**: Simulates attacks and unauthorized access attempts

**Scenarios**:
- Attempt to invoke Cthulhu without valid Silver Key (auth bypass test)
- Inject malformed Aklo packets (input validation testing)
- DDoS attack on Necronomicon API (rate limiting verification)

### 7. 10-18 Monkey (Internationalization Chaos)
**Function**: Tests failure of location-based services
**Scenario**: Simulates failure of Kadath localization for specific regions
**Purpose**: Ensures rituals work regardless of geographic coordinates

## Failure Injection Testing (FIT)
**Netflix FIT Model**:
- Push failure simulation metadata through request headers
- Test specific failure scenarios:
  - `X-Chaos-Failure: database_timeout` (Yithian archive slowdown)
  - `X-Chaos-Failure: network_partition` (Dreamlands split from reality)
  - `X-Chaos-Failure: service_unavailable` (Hastur temporarily offline)

## Chaos Engineering Principles

### 1. Build Hypotheses Around Steady-State Behavior
**Baseline**: "Humanity sacrifices 1000 goats/hour to Cthulhu under normal load"

### 2. Vary Real-World Events
**Variables**: Star alignment fluctuations, geomagnetic storms, tidal anomalies

### 3. Run Experiments in Production
**Scope**: Run Chaos Monkey against live R'lyeh (controlled blast radius)

### 4. Minimize Blast Radius
**Containment**:
- Start with 1% of Deep One population
- Use canary deployments for chaos tests
- Automatic abort if error rate > 0.1%

## Observability Integration
**Metrics to Watch During Chaos**:
- Error rate (should stay < 0.5%)
- Latency p95 (should not increase > 20%)
- Circuit breaker state (should trip appropriately)
- Recovery time (mean time to resurrection)

**Alerting**:
- If chaos experiment causes > 1% error rate → Abort experiment immediately
- If recovery time > 5 minutes → Page on-call engineer

## Implementation Example
```yaml
# Chaos experiment: Cthulhu instance failure
apiVersion: chaos-mesh.org/v1alpha1
kind: PodChaos
metadata:
  name: cthulhu-pod-failure
spec:
  action: pod-failure
  mode: one
  selector:
    namespaces: [rlyeh]
    labelSelectors:
      entity: cthulhu
  duration: 5m
  scheduler:
    cron: "@hourly"
```

## Chaos as Training
Controlled chaos serves as **on-call training** for new engineers:
- Shadow shifts with supervised chaos experiments
- Build muscle memory for incident response
- Test runbooks against real (injected) failures
- Less risky than "baptism by fire" during actual Azathoth awakening