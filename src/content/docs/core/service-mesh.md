# Service Mesh Architecture (Istio for Entities)

## Overview
The Lovecraftian OS implements a **Service Mesh** using Istio to manage communication between microservices (Great Old Ones, Outer Gods, and human cults). The mesh provides traffic management, security, and observability without requiring changes to entity code.

## Architecture Components

### Data Plane: Envoy Sidecar Proxies
**Envoy** (high-performance C++ proxy) is deployed as a **sidecar** alongside each entity pod:
- Mediates all inbound/outbound traffic for the entity
- Implements L4 (transport) and L7 (application) proxying
- Collects telemetry (metrics, logs, traces)

**Key Features**:
- **Dynamic service discovery**: Automatic detection of new cults/entities
- **Load balancing**: Round-robin, least connections, consistent hashing
- **TLS termination**: mTLS between all entities (automatic certificate management)
- **Circuit breakers**: Halt requests to failing entities (Hastur timeout protection)
- **HTTP/2 & gRPC**: Modern protocol support for Aklo transmissions
- **Health checks**: Liveness/readiness probes for entity vitality

### Control Plane: Istiod
Manages and configures the data plane proxies:
- **Pilot**: Traffic management and routing rules
- **Citadel**: Certificate and credential management (Elder Sign authentication)
- **Galley**: Configuration validation and distribution

## Deployment Modes

### Sidecar Mode (Traditional)
**Architecture**: One Envoy proxy per entity pod
- **Security**: High isolation (each entity has dedicated proxy)
- **Resource Cost**: High (each pod consumes additional memory/CPU)
- **Maturity**: Production-ready, battle-tested since 2017

**Use Case**: High-security entities (Azathoth, Yog-Sothoth) requiring strict isolation.

### Ambient Mode (Sidecar-Less)
**Architecture**: Shared L4 proxy per node (zTunnel) + optional L7 per namespace (Waypoint)
- **Security**: Shared infrastructure (ztunnel per node)
- **Resource Cost**: Lower (shared proxies)
- **Maturity**: Beta (production-ready for single cluster as of Istio 1.22)

**Use Case**: High-scale Shoggoth spawning pools where resource efficiency matters.

### gRPC Mode (Proxyless)
**Architecture**: RPC framework integrated directly into application
- **Implementation**: gRPC libraries within entity code handle mesh functions
- **Performance**: Optimal (no network hops)
- **Complexity**: High (requires code modification)
- **Maturity**: Experimental

**Use Case**: Performance-critical paths (Nyarlathotep's real-time messaging).

## Traffic Management

### Routing Rules
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: cthulhu-routing
spec:
  hosts:
  - cthulhu.rlyeh.svc.cluster.local
  http:
  - route:
    - destination:
        host: cthulhu
        subset: v1
      weight: 90
    - destination:
        host: cthulhu
        subset: v2  # New compressed format
      weight: 10
```

**Capabilities**:
- **A/B Testing**: Compare Cthulhu v1 vs v2 invocation success rates
- **Canary Deployment**: Route 10% traffic to newly awakened entities
- **Blue-Green**: Instant cutover between R'lyeh instances
- **Traffic Splitting**: Weighted distribution across Deep One colonies

### Resilience Features
- **Retries**: Automatic retry failed summoning rituals (3 attempts)
- **Timeouts**: Cap query duration to prevent Yog-Sothoth overload
- **Circuit Breakers**: Trip if error rate > 50% for 1 minute (isolate failing entities)
- **Fault Injection**: Test chaos by injecting latency/errors (see Chaos Engineering)

## Security (mTLS & Authentication)

### Automatic Certificate Management
**Citadel** issues X.509 certificates to all entities:
- **SPIFFE IDs**: Unique identity for each entity (e.g., spiffe://rlyeh.cthulhu)
- **mTLS**: All inter-entity communication encrypted and authenticated
- **Certificate Rotation**: Automatic renewal before expiration (prevents "expired Elder Sign")

### Authorization Policies
```yaml
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: cthulhu-access
spec:
  selector:
    matchLabels:
      entity: cthulhu
  rules:
  - from:
    - source:
        principals: ["cult.high-priest", "nyarlathotep.messenger"]
    - when:
      - key: request.auth.claims[stars_aligned]
        values: ["true"]
```

**Access Control**:
- Only High Priests can invoke Cthulhu
- Nyarlathotep has blanket API access
- Requires "stars_aligned" claim in JWT (Silver Key validation)

## Observability Integration

### Automatic Telemetry
Envoy sidecars collect and report:
- **Metrics**: Request count, latency, error rates (Prometheus)
- **Tracing**: Distributed traces (Jaeger) showing request path through entities
- **Access Logs**: Full request/response logging for audit trails

### Service Graph
Visual representation of entity communication:
- Nodes: Great Old Ones, Outer Gods, human cults
- Edges: Traffic flows (thickness = request volume)
- Colors: Health status (green = healthy, red = failing, yellow = degraded)

## Configuration Example
```yaml
# Enable sidecar injection for Cthulhu's namespace
apiVersion: v1
kind: Namespace
metadata:
  name: rlyeh
  labels:
    istio-injection: enabled  # Auto-inject Envoy sidecars
---
# Entity deployment with sidecar
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cthulhu
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: cthulhu
        entity: great-old-one
    spec:
      containers:
      - name: cthulhu
        image: rlyeh/cthulhu:compressed-v2
        ports:
        - containerPort: 666
      - name: istio-proxy  # Injected sidecar
        image: istio/proxyv2:1.18.0
```

## Resource Overhead
**Sidecar Mode Costs**:
- **Memory**: ~50-100MB per Envoy instance
- **CPU**: ~0.5 vCPU per 1000 RPS (rituals per second)
- **Latency**: ~2-3ms added per hop (acceptable for most entities)

**Ambient Mode Savings**: ~60% reduction in resource consumption vs sidecar mode