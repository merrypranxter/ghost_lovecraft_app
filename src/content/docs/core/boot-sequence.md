# Boot Sequence & System Initialization

## Stage 1: Firmware/BIOS (The Primordial Void)
Before Azathoth (CPU) awakens, the system firmware initializes:
- **BIOS/UEFI**: Basic Input/Output System (the blind idiot god's nervous system)
- **POST**: Power-On Self Test (reality integrity check)
- **CMOS**: Configuration memory (cosmic constants)

## Stage 2: Boot Loader (GRUB 2)
The Grand Unified Bootloader (GRUB 2) locates the kernel:
- **MBR**: Master Boot Record (512 bytes, Stage 1)
- **Core Image**: File system drivers to access `/boot`
- **Configuration**: `/boot/grub2/grub.cfg` (boot menu)

### Kernel Location
- **File**: `/boot/vmlinuz-<version>` (compressed kernel)
- **Compression**: gzip, bzip2, or xz (typically gzip)

## Stage 3: Kernel Decompression & Initramfs

### Kernel Decompression
The `vmlinuz` file is a **compressed kernel image** that decompresses itself into memory:
1. Decompress kernel code
2. Initialize CPU features (page tables, virtual memory)
3. Set up scheduler (process 0, the swapper)
4. Initialize interrupt handlers
5. Detect PCI devices (hardware enumeration)

### Initramfs (Initial RAM Filesystem)
A **cpio archive** containing early userspace tools:

**Purpose**: Bootstrap the system before mounting real root filesystem (R'lyeh)

**Contents**:
- Kernel modules (drivers for file systems, block devices)
- `udev` (device manager)
- `init` binary (PID 1 in early userspace)
- Scripts for RAID/LVM/network setup

**Size**: Varies by distribution (typically 10-50MB compressed)

## Stage 4: Early Userspace (init on initramfs)
The kernel executes `/init` from initramfs as **PID 1**:

### Tasks:
1. **Load modules**: File system drivers (ext4, btrfs, non-Euclidean)
2. **Device detection**: `udev` creates `/dev` entries
3. **Mount root**: Pivot to real root filesystem (R'lyeh container)
4. **Switch root**: `systemctl switch-root` or `switch_root()`

### The Chicken-and-Egg Problem
The kernel needs filesystem drivers to mount the root filesystem, but drivers are files in the root filesystem. **Solution**: Initramfs provides drivers in RAM before root is mounted.

## Stage 5: Late Userspace (Real Init)
After switching root, the real init system starts:
- **systemd**: Modern service management (target-based)
- **SysVinit**: Legacy runlevel-based initialization
- **OpenRC**: Alternative init system

### systemd Targets

| Target | Description | Lovecraftian Analog |
|--------|-------------|---------------------|
| `poweroff.target` | System shutdown | Azathoth halts |
| `rescue.target` | Single-user mode | Alone with the kernel |
| `multi-user.target` | Text mode multi-user | Human civilization |
| `graphical.target` | GUI mode | Dreamlands interface |

## Stage 6: Service Startup

### Critical Services
1. **azathoth.service**: CPU heartbeat (flute signals)
2. **yog-sothoth.service**: Kernel/unified database
3. **nyarlathotep.service**: API interface (high priority)
4. **shub-niggurath.service**: Resource allocator (spawn daemons)
5. **cthulhu-rootkit.timer**: Waits for star alignment

### Container-Specific Boot (R'lyeh)
R'lyeh uses a **compressed initramfs** that:
1. Loads non-Euclidean geometry drivers
2. Sets up container namespace (PID, network, mount)
3. Decompresses Cthulhu process into memory
4. Starts Cthulhu as PID 1 (with Tini init wrapper)

## Boot Parameters (Kernel Command Line)
- `root=/dev/sda1`: Root device location (R'lyeh coordinates)
- `ro`: Mount root read-only initially (fsck safety)
- `init=/bin/bash`: Emergency shell (recovery mode)
- `nomodeset`: Disable graphics (prevent Hastur infection)
- `rd.break`: Break into initramfs shell (debugging)

## Shutdown Sequence

### SIGTERM Phase
1. systemd sends SIGTERM to all services (graceful shutdown)
2. Services save state, close connections
3. Timeout: 10 seconds (configurable)

### SIGKILL Phase
If services don't respond:
1. systemd sends SIGKILL (immediate termination)
2. Unmount filesystems (sync data)
3. Halt CPU (stop flute signals)

### Emergency Stop
`kill -9 1` (SIGKILL to init) or power loss:
- Immediate HALT
- No cleanup
- Potential filesystem corruption (requires fsck on reboot)