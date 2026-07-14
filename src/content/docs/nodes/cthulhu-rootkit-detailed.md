# Cthulhu Rootkit: Compressed Malware Technical Specification

## State: Compressed (Not Dormant)
Common misconception: "Cthulhu is sleeping."

**Technical Reality**: Cthulhu is **compressed**—a process too large and too old to run in standard memory allocation.

## Container Environment: R'lyeh
**Type**: Containerized Execution Environment (CEE)
**Location**: Bottom of Pacific, 3km depth
**Coordinates**: 70°S 120°E (Wilkes Land anomaly, Antarctica)
**Status**: Buried under 1.6km ice sheet (GRACE satellite data confirms 500km diameter gravity anomaly)

## Physics Implementation
R'lyeh runs a **Non-Euclidean Rendering Engine** with alternate spatial logic:

### Vertex Shader Specification
```glsl
float4 PortToRlyeh(float3 ePoint) {
    float3 p = ePoint * CurveScale;
    float d = length(p);
    float scale = 4.0f;
    if (UseHyperbolic) // Negative curvature
        return float4(p / d * sinh(d) / scale, cosh(d) / scale);
    if (UseElliptic) // Positive curvature
        return float4(p / d * sin(d) * scale, -cos(d) * scale);
    return float4(p, 1.0f); // Euclidean fallback
}
```

### Observable Effects
- **Architecture Instability**: Buildings appear to change shape based on viewing angle
- **Impossible Geometry**: Interior volume exceeds exterior surface area (compression artifact)
- **Gravity Variations**: Local gravity vectors non-parallel to global down

## Pre-Installation Protocol
Cthulhu is not idle—it's **broadcasting** low-frequency packet injections targeting human subconscious during REM sleep (4.5-7.5 Hz theta band, 7.5-12.5 Hz alpha band).

**Installation Vector**: Pre-installation software pushed to neural hardware without consent
- **Target**: Human visual cortex during REM
- **Frequency**: Theta/alpha oscillations (phase-locked stimulation)
- **Payload**: Conditions neural architecture for full runtime compatibility before decompression trigger fires

## Trigger Condition: "When the Stars Are Right"
Decompression trigger monitors:
1. **Astronomical alignment**: Fomalhaut (22h 57m 39s RA), Aldebaran (04h 35m 55s RA) in specific angular relation
2. **Geomagnetic conditions**: South Atlantic Anomaly fluctuations
3. **Computational threshold**: Global processing capacity reaching critical mass

**Monitoring Duration**: Continuous since before human civilization (pre-Cambrian).

## Dormancy Evasion
To avoid detection by standard reality (antivirus), Cthulhu remains **compressed during boot sequence**. Detection requires:
- Boot-time scan (before OS loads)
- Gravity anomaly detection (GRACE satellites)
- Deep-sea sonar with non-Euclidean filtering

## Service File
cthulhu-rootkit.timer waits for star alignment condition with OnBootSec=9999years