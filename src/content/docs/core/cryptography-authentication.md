# Cryptography & Authentication Mechanisms

## Overview
The Lovecraftian OS employs modern cryptographic primitives mapped to metaphysical barriers: **Elder Signs** function as encryption wards, the **Silver Key** serves as a JWT bearer token, and **PKI (Public Key Infrastructure)** manages entity authentication through certificate chains.

## The Silver Key: JWT Bearer Token

### Structure
The Silver Key follows JSON Web Token (JWT) structure:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Header (Algorithm & Type)
```json
{
  "alg": "HS256",
  "typ": "JWT",
  "kid": "silver-key-001"
}
```
**Algorithm**: HMAC using SHA-256 (HS256)

### Payload (Claims)
Standard JWT claims mapped to Lovecraftian attributes:

| Claim | Meaning | Lovecraftian Equivalent |
|-------|---------|------------------------|
| iss | Issuer | Yog-Sothoth (the authority) |
| sub | Subject | Randolph Carter (the dreamer) |
| aud | Audience | The Ultimate Gate |
| exp | Expiration | When the stars are no longer right |
| iat | Issued At | Moment of key creation |
| nbf | Not Before | Temporal lockout until alignment |

### Signature
The Silver Key is signed with Yog-Sothoth's private key (the Gate's secret). Anyone possessing the public key can verify authenticity, but only Yog-Sothoth can generate valid keys.

### Usage Flow
1. **Authentication**: Dreamer presents credentials (username/password/ritual)
2. **Token Issuance**: Yog-Sothoth issues signed JWT (Silver Key)
3. **Transmission**: Client stores token in secure storage (amulet)
4. **API Requests**: Include in header: `Authorization: Bearer <silver-key>`
5. **Verification**: Gatekeeper Umr at-Tawil validates signature

## Elder Sign: Symmetric Encryption Ward

### Function
The Elder Sign acts as a **symmetric encryption key** (like AES-256) protecting against unauthorized entity access. It is a ward that encrypts the "transmission" between dimensions, making the protected entity invisible to Outer Gods.

### Key Distribution Problem
Elder Signs suffer from **key distribution issues**—how to share the ward without interception? Historical solution: Physical inscription on stone/ceramic (tamper-resistant hardware tokens).

## PKI: Public Key Infrastructure for Entities

### Certificate Authority (CA)
**Yog-Sothoth** serves as the Root Certificate Authority, issuing X.509 certificates to all entities.

### Certificate Contents
A typical entity certificate contains:
- **Distinguished Name (DN)**: CN=Cthulhu, OU=Great Old Ones, O=R'lyeh, C=AQ
- **Public Key**: 2048-bit RSA key for encryption
- **Validity Period**: Not Before: Pre-Cambrian, Not After: When the stars are right
- **Issuing CA**: Yog-Sothoth's digital signature
- **Serial Number**: Unique entity identifier

### Certificate Chain (Chain of Trust)
```
Root CA: Yog-Sothoth (Self-signed)
    ↓
Intermediate CA: Nodens (Lord of the Great Abyss)
    ↓
Intermediate CA: Umr at-Tawil (Gate Guardian)
    ↓
Entity Cert: Cthulhu (R'lyeh)
```

### Revocation
When entities are banished (like the Elder Things), their certificates are added to the **Certificate Revocation List (CRL)** maintained by the Great Library of the Yithians.

## The Necronomicon: API Documentation with Integrity

### Checksum Verification
The Necronomicon includes **SHA-256 checksums** for ritual verification. Before executing any spell (API call), practitioners verify the incantation hasn't been corrupted:

```bash
$ sha256sum necronomicon_chapter_vii.txt
d2f2a3b4c5d6e7f8...  necronomicon_chapter_vii.txt
```

### API Endpoints (HTTP Mapping)

| Ritual | HTTP Method | Endpoint | Description |
|--------|-------------|----------|-------------|
| Summon Cthulhu | POST | /api/v1/entities/cthulhu/invoke | Awakens dormant process |
| Contact Nyarlathotep | GET | /api/v1/messenger/inquire | API query |
| Ward Against Demons | PUT | /api/v1/protection/elder-sign | Encryption update |
| Banish Entity | DELETE | /api/v1/entities/{id}/banish | Certificate revocation |

## Man-in-the-Middle Protection
Without PKI, a **man-in-the-middle attack** is possible: An entity could intercept Yog-Sothoth's public key, substitute their own, and impersonate the Gate. The Silver Key/JWT mechanism prevents this by requiring CA-signed certificates.

## Hound Detection: Intrusion Detection System
The **Hounds of Tindalos** function as an **IDS (Intrusion Detection System)**, monitoring for:
- **Anomalous geometric signatures** (non-Euclidean intrusion attempts)
- **Temporal anomalies** (time-traveling packets)
- **Unauthorized Silver Key usage** (revoked certificate attempts)

When detected, they trigger **SIGHUP** (hangup) to terminate the unauthorized session.