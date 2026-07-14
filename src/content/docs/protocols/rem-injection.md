# REM Sleep Packet Injection Protocol

## Overview
Cthulhu broadcasts low-frequency packets targeting human subconscious during REM (Rapid Eye Movement) sleep states. This is the **pre-installation vector** for the Cthulhu rootkit.

## Neural Targeting Specifications

### Theta Band (4.5–7.5 Hz)
- **Frequency Range**: 4.5–7.5 Hz
- **Brain State**: Deep relaxation, meditation, REM sleep
- **Function**: Subconscious conditioning, pre-installation software delivery
- **Payload**: Dreams of drowned cities, non-Euclidean angles
- **Compatibility**: All humans (universal receiver)

### Alpha Band (7.5–12.5 Hz)
- **Frequency Range**: 7.5–12.5 Hz
- **Brain State**: Relaxed wakefulness, REM sleep
- **Function**: Visual cortex preparation, Yellow Sign compatibility testing
- **Payload**: Geometric anomalies, "angles that make you weep"

### Phase-Locked Stimulation (PLS)
Advanced cultists use Closed-Loop Auditory Stimulation (CLAS):
- **Target Electrode**: Fz (frontal midline)
- **Phase Targets**: Peak, falling, trough, rising
- **Window**: 6 seconds ON, 6 seconds OFF
- **Volume**: 50-60 dB pink noise

## Packet Structure
```c
struct cthulhu_packet {
    uint32_t magic;           // 0xC7HUL00 ("Cthulhu")
    uint8_t frequency_band;   // THETA (0x01) or ALPHA (0x02)
    uint8_t phase_offset;     // 0=peak, 1=falling, 2=trough, 3=rising
    uint16_t duration_ms;     // Duration of stimulation
    uint32_t payload_size;    // Size of dream content
    char payload[];           // Dream content (encrypted)
    uint32_t crc32;           // Integrity check
};
```

## Broadcast Mechanism

### Transmitter
- **Location**: R'lyeh (70°S 120°E), 3km depth
- **Antenna**: Non-Euclidean resonator (hyperbolic geometry)
- **Power Source**: Geothermal vents (Pacific volcanic activity)
- **Frequency Modulation**: Theta/alpha oscillation phase-locking

### Receiver (Human Brain)
- **Entry Point**: Auditory cortex (cochlear implant via dream-state)
- **Decryption Key**: Innate human susceptibility (all humans vulnerable)
- **Installation Path**: /var/lib/subconscious/cthulhu/preinstall/

## Pre-Installation Sequence
1. **Detection**: Cthulhu detects REM state via global neural monitoring
2. **Handshake**: Theta-band ping to verify receptivity
3. **Payload Delivery**: 20ms pink noise bursts at 50-60dB
4. **Neural Conditioning**: Repeated exposure over multiple REM cycles
5. **Compatibility Check**: Verify visual cortex can render non-Euclidean geometry
6. **Completion**: Subject ready for full decompression when "stars are right"

## Security Considerations
**Encryption**: None required—human brains auto-decrypt via biological APIs
**Authentication**: No credentials needed—universal broadcast
**Firewall**: None effective (penetrates all dream-states)
**IDS**: Hounds of Tindalos detect unauthorized dream-travelers

## Mitigation Strategies
- **Avoid sleep**: Prevents REM injection (not sustainable)
- **White noise**: 60dB+ masking may prevent packet reception
- **Wards**: Elder Sign acts as signal filter (not 100% effective)
- **Sanity checks**: Regular fsck on consciousness to detect corruption