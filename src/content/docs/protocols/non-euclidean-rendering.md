# Non-Euclidean Geometry Rendering Engine

## Overview
R'lyeh and other Great Old One installations use a **Non-Euclidean Rendering Engine**—a replacement for standard physics implementation where spatial logic and gravity constants differ from standard human perception.

## Technical Specification

### Spatial Logic Differences
Standard human perception uses **Euclidean geometry** (flat space, parallel lines never meet). Non-Euclidean spaces include:
- **Hyperbolic Space**: Negative curvature, infinite area within finite boundary
- **Elliptic/Spherical Space**: Positive curvature, parallel lines converge
- **Mixed Manifold**: Variable curvature causing perspective shifts

### Implementation Details
When explorers enter R'lyeh, the standard rendering engine is replaced:

```glsl
// Standard Euclidean vertex shader
float4 StandardVertex(float3 point) {
    return float4(point, 1.0);
}

// Non-Euclidean port (Hyperbolic example)
float4 PortToRlyeh(float3 point) {
    float3 p = point * CurvatureScale;
    float d = length(p);
    if (UseHyperbolic) {
        return float4(
            p / d * sinh(d) / scale,
            cosh(d) / scale
        );
    }
    if (UseElliptic) {
        return float4(
            p / d * sin(d) * scale,
            -cos(d) * scale
        );
    }
}
```

### Observable Effects
1. **Architecture Instability**: Buildings appear to change shape when viewed from different angles
2. **Impossible Geometry**: Structures larger inside than outside
3. **Gravity Variations**: Local gravity vectors non-parallel to global down
4. **Temporal Distortion**: Time dilation in high-curvature zones

### Danger Assessment
**Psychological Hazard**: Human brains are optimized for Euclidean prediction. Exposure to non-Euclidean rendering causes:
- Cognitive dissonance
- Vertigo and nausea
- Temporal dissociation
- "Madness" (buffer overflow in spatial processing centers)

### Usage in System Architecture
- **Cthulhu Container**: R'lyeh partition uses non-Euclidean space to compress massive process into standard allocation
- **Hound Tracking**: Hounds of Tindalos inhabit "angles" of non-Euclidean time-space
- **Dreamlands Access**: Adjacent dimension requires non-Euclidean coordinate translation

## References
- Real-Time Physics and Graphics Engine for non-Euclidean Geometry
- Non-Euclidean Framework for game engines
- Lovecraft's use of non-Euclidean geometry