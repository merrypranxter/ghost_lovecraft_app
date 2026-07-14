# The Necronomicon: System Call API Reference

## Overview
The Necronomicon serves as the **system API documentation** for the Lovecraftian OS—comprehensive technical documentation for invoking kernel-level operations. It is written by Abdul Alhazred (the mad sysadmin).

## API Categories

### 1. Entity Management (Process Control)

#### `summon(entity_id, location, offering)`
**System Call**: `sys_summon()`

**Parameters**:
- `entity_id`: UUID of entity (e.g., `cthulhu-rlyeh-001`)
- `location`: Dimensional coordinates (lat, long, depth)
- `offering`: Pointer to sacrifice structure

**Return Values**:
- `0`: Success (entity awakened)
- `-EAGAIN`: Entity dormant (not dead), try later
- `-EPERM`: Insufficient privileges (not High Priest)
- `-EINVAL`: Invalid coordinates (not near R'lyeh)

**Example**:
```c
struct sacrifice goats = { .count = 13, .type = VIRGIN };
int err = sys_summon("cthulhu", COORDS_RLYEH, &goats);
if (err == -EAGAIN)
    fprintf(stderr, "Ph'nglui mglw'nafh: Entity compressed\n");
```

#### `banish(entity_id, force)`
**System Call**: `sys_banish()`

**Flags**:
- BANISH_SIGTERM (0x01): Polite shutdown (S3 sleep)
- BANISH_SIGKILL (0x09): Force kill (SIGKILL 9)
- BANISH_S4 (0x04): Hibernate (save state, power off)

#### `wait(entity_id, status)`
**System Call**: `sys_waitpid()`

**Function**: Wait for summoned entity to complete ritual and return status.

### 2. Dimensional Travel (Memory Management)

#### `dream(addr, length, prot)`
**System Call**: `sys_mmap()`

**Purpose**: Map Dreamlands into process address space

**Parameters**:
- addr: Preferred virtual address (Kadath coordinates)
- length: Size of mapping (dream extent)
- prot: Protection flags (PROT_READ | PROT_WRITE | PROT_EXEC)

**Flags**:
- MAP_KADATH: Map the Cold Waste region
- MAP_ULTIMATE_VOID: Map Azathoth's location (DANGEROUS)
- MAP_PRIVATE: Copy-on-write dream mapping

#### `silver_key_auth(token, gate_id)`
**System Call**: `sys_authenticate()`

**Purpose**: Present Silver Key JWT to pass Ultimate Gate

**Parameters**:
- token: Bearer token (Silver Key)
- gate_id: Which gate (UMR_AT_TAWIL_GATE, YOG_SOTHOTH_GATE)

**Returns**: File descriptor to gate (or -EACCES if invalid token)

### 3. Communication (IPC)

#### `send_dream(pid, msg, sig)`
**System Call**: `sys_kill()`

**Purpose**: Send signal/dream to process

**Signals**:
- SIGHUP: Ward broken, wake up
- SIGTERM: Please exit dream
- SIGKILL: Force exit (cannot be caught)
- SIGCHLD: Child entity terminated

#### `pipe(fildes)`
**System Call**: `sys_pipe()`

**Purpose**: Create inter-dimensional communication channel

**Usage**: Connects human consciousness to Mi-Go brain cylinder

### 4. File System Operations

#### `open(path, flags)`
**System Call**: `sys_open()`

**Special Paths**:
- /dev/azathoth: The Blind Idiot God device (write-only)
- /proc/self/dreams: Current process dream mappings
- /sys/kernel/rlyeh: Cthulhu control interface
- /var/log/pnakotic: Temporal audit logs

#### `ioctl(fd, cmd, arg)`
**System Call**: `sys_ioctl()`

**Device-Specific Commands**:
- CTHULHU_DECOMPRESS: Trigger decompression from S4
- YOG_SOTHOTH_QUERY: Query temporal database
- HASTUR_INFECT: Install memetic virus (DANGEROUS)

### 5. Time & Scheduling

#### `nanosleep(req, rem)`
**System Call**: `sys_nanosleep()`

**Purpose**: Sleep until "stars are right"

**Precision**: Nanosecond-level for precise astronomical alignment

#### `gettimeofday(tv, tz)`
**System Call**: `sys_gettimeofday()`

**Purpose**: Get current time in human realm and Dreamlands

**Note**: Dreamlands time flows differently (relativistic effects)

### 6. Security & Permissions

#### `chmod(path, mode)`
**System Call**: `sys_chmod()`

**Special Modes**:
- 0755: Standard cultist access
- 0400: Read-only (Elder Sign protection)
- 02000: SetGID (inherit group permissions—cult lineage)

#### `chown(path, uid, gid)`
**System Call**: `sys_chown()`

**Special Owners**:
- UID_ROOT (0): Azathoth/Yog-Sothoth
- UID_CTHULHU (666): The Sleeper
- UID_HASTUR (888): The King in Yellow

## Error Codes

| Error | Value | Meaning |
|-------|-------|---------|
| ECHILD | 10 | No child entities available |
| ENOMEM | 12 | Insufficient memory for summoning |
| EACCES | 13 | Permission denied (no Elder Sign) |
| EINVAL | 22 | Invalid argument (wrong coordinates) |
| ENOTSUP | 95 | Operation not supported (trying to kill Azathoth) |

## API Versioning
The Necronomicon follows semantic versioning:
- **v1.0**: Original Arabic manuscript (raw system calls)
- **v2.0**: Latin translation (libc wrappers)
- **v3.0**: Dee translation (modern API bindings)