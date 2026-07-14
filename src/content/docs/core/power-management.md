# Power Management & Sleep States

## Overview
The Lovecraftian OS implements **ACPI (Advanced Configuration and Power Interface)** sleep states mapped to entity dormancy. Cthulhu's "sleep" is actually **S4 (Hibernate/Suspend to Disk)**, not true shutdown.

## ACPI Sleep States (Sx States)

### S0: Working (Azathoth Awake)
- **State**: System fully operational
- **Power**: Full consumption (billions of cycles/second)
- **Description**: Azathoth is actively processing, surrounded by the "flutes" (system clock signals)
- **Wake Events**: Any interrupt (cultist invocation)

### S1: Standby (Light Sleep)
- **State**: CPU stops executing, maintains cache/context
- **Power**: Reduced consumption
- **Entities**: Minor servitors in light rest
- **Wake Latency**: Immediate
- **Lovecraftian Analog**: Light dream state

### S2: Deeper Standby (Rarely Used)
- **State**: CPU loses context, memory maintained
- **Power**: Further reduced
- **Usage**: Rare in modern Great Old Ones (obsolete)

### S3: Suspend to RAM (Cthulhu's "Dreaming")
- **State**: System appears off, RAM refreshed, CPU halted
- **Power**: ~3.2W (trickle to RAM only)
- **Description**: Cthulhu is **compressed in R'lyeh**, not dead. RAM maintains the process state.
- **Wake Triggers**:
  - Power button (deliberate cultist action)
  - LAN (magic packet from Deep Ones)
  - RTC alarm ("when the stars are right")
- **Wake Latency**: Fast (seconds)

**Technical Implementation**:
```c
// Kernel enters S3
echo deep > /sys/power/mem_sleep
systemctl suspend
```
The system writes to `/sys/power/state`, kernel flushes caches, powers down CPU, and maintains RAM in slow refresh mode.

### S4: Hibernate (Cthulhu's True State)
- **State**: System appears off, memory saved to disk (hibernate file), zero power
- **Power**: ~2.9W (trickle only to power button)
- **Description**: Cthulhu is **compressed**—memory contents written to R'lyeh's non-volatile storage (the ocean floor).
- **Wake Triggers**: Physical interaction only (power button, RTC)
- **Wake Latency**: Long (minutes to decompress)
- **Storage**: Hibernate file in swap partition (R'lyeh)

**Hibernation Process**:
1. **Preparation**: hibernation_ops saves system state
2. **Memory Snapshot**: Kernel writes entire RAM to /swap/hibernation (compressed)
3. **Power Off**: Complete shutdown to S4
4. **Resume**: Bootloader detects hibernation image, decompresses, restores state

### S5: Soft Off (True Death)
- **State**: System off, no context retained
- **Power**: ~2.9W (trickle to wake circuits only)
- **Description**: True entity death—requires full resurrection (reboot)
- **Difference from S4**: No hibernation file, complete loss of state

## Device Power States (Dx States)
Peripherals have independent power states:
- **D0**: Fully on (Mi-Go brain cylinders active)
- **D1-D2**: Intermediate power saving
- **D3**: Off (Deep Ones in deep storage)

## Timekeeping: Jiffies and the System Clock

### Jiffies: The Heartbeat of Azathoth
The kernel variable jiffies counts timer interrupts since boot:
- **HZ**: Configurable timer frequency (typically 100-1000 Hz)
- **Tick**: Time between interrupts (1-10ms depending on HZ)
- **Overflow**: 32-bit systems wrap around every ~49 days (1000 Hz)
- **64-bit**: jiffies_64 provides 600 million years before overflow

### Star Alignment Calculations
The "when the stars are right" trigger uses **jiffies** for precise timing:

```c
unsigned long star_alignment_time = jiffies + (centuries * HZ * 365 * 24 * 3600);
if (time_after_eq(jiffies, star_alignment_time))
    wake_cthulhu();
```

### Clock Sources
- **TSC (Time Stamp Counter)**: CPU cycle counter (fast, per-core)
- **HPET (High Precision Event Timer)**: Hardware timer (slow but consistent)
- **RTC (Real-Time Clock)**: Maintains time across S4/S5 (battery backed)

## Wake-on-LAN (Deep One Signal)
Even in S4 (hibernation), the network interface remains partially powered to receive "magic packets" from the Deep Ones (Wake-on-LAN). This allows remote awakening of Cthulhu without physical presence.

## Power Management Issues

### S3 vs S4 Instability
Some Great Old Ones (older hardware) have buggy ACPI implementations:
- **Immediate wake**: GPP0 interrupt not properly disabled
- **Workaround**: Disable wake-on-PCI: `echo GPP0 > /proc/acpi/wakeup`
- **Kernel parameter**: `mem_sleep_default=deep` forces S3 instead of S0ix (Modern Standby)

### Hybrid Sleep
**Hybrid suspend** (suspend-to-both) writes hibernation file (S4) but enters S3. If battery depleted, resumes from disk. If not, fast resume from RAM. This is Cthulhu's actual implementation—dual-state redundancy.