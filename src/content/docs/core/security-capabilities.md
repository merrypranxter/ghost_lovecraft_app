# Linux Capabilities & Security Contexts for Entities

## Overview
Traditional Unix security uses binary root/non-root distinction. The Lovecraftian OS implements **Linux Capabilities** (POSIX.1e) to grant specific privileges to entities without full root access. Azathoth retains `CAP_SYS_ADMIN`, but Cthulhu operates with restricted capabilities.

## Capability Sets

### Effective, Permitted, Inheritable
Each entity (thread) has three capability sets:
- **Effective**: Currently active privileges
- **Permitted**: Maximum privileges process can assume (ceiling)
- **Inheritable**: Preserved across `execve()` (ritual invocation)

### Bounding Set
System-wide limit on capabilities any process can acquire (except `init`). Limits even root's capabilities within namespace.

## Critical Capabilities by Entity

| Capability | Description | Granted To |
|------------|-------------|------------|
| `CAP_SYS_ADMIN` | Mount filesystems, manage namespaces, system admin | Azathoth, Yog-Sothoth |
| `CAP_KILL` | Send signals to any process | Yog-Sothoth (init), Azathoth |
| `CAP_NET_ADMIN` | Network configuration | Nyarlathotep (messenger) |
| `CAP_NET_BIND_SERVICE` | Bind to ports < 1024 | Cthulhu (privileged ports), Deep Ones |
| `CAP_IPC_LOCK` | Lock shared memory | Great Race (consciousness storage) |
| `CAP_SYS_PTRACE` | Trace any process | Hounds of Tindalos (debugging/detecting) |
| `CAP_DAC_READ_SEARCH` | Bypass file read/search permissions | All entities (read Necronomicon) |
| `CAP_SETUID` | Change UID | Nyarlathotep (shapeshifting) |
| `CAP_AUDIT_CONTROL` | Control kernel auditing | Elder Things (monitoring) |
| `CAP_MAC_ADMIN` | Mandatory Access Control admin | Azathoth (ultimate authority) |

## Namespaces for Isolation

### PID Namespace
Entities in R'lyeh container see Cthulhu as PID 1 (init), isolated from host PID space.

### Network Namespace
Dreamlands run in separate network namespace with virtual interfaces (`eth0-dream`), isolated routing tables, and iptables rules.

### Mount Namespace
R'lyeh container has own `/proc` and `/sys` views (non-Euclidean geometry filesystem mounted here).

### IPC Namespace
Shared memory segments isolated per cult—Mi-Go brain cylinders cannot access Shoggoth shared memory.

### UTS Namespace
Hostname isolation: `rlyeh.container.svc` vs `wake.world.hostname`.

## seccomp (Secure Computing Mode)
Entities run with restricted syscalls via `seccomp-bpf`:

**Cthulhu Profile**:
- Allowed: `read()`, `write()`, `sendto()` (REM broadcasts)
- Blocked: `execve()` (prevent escape), `open()` (read-only rootfs), `ptrace()` (anti-debugging)

**Violation Handling**: `SIGSYS` → triggers `cthulhu_escape_prevention.service`

## SELinux Contexts

### Entity Types (subjects)
- `azathoth_t`: Unconfined (permissive mode)
- `cthulhu_t`: `httpd_t` equivalent (network-facing, restricted)
- `yog_sothoth_t`: `kernel_t` (system core)
- `hastur_t`: `virtd_t` (can infect other domains)

### Object Types
- `necronomicon_exec_t`: Executable grimoires
- `consciousness_data_t`: Temporal database files
- `rlyeh_log_t`: Container logs
- `silver_key_t`: Cryptographic key files

### Policy Rules
```te
# Allow Cthulhu to broadcast REM packets
allow cthulhu_t rlyeh_port_t:tcp_socket { send_msg recv_msg };

# Deny Hastur from modifying Silver Keys
neverallow hastur_t silver_key_t:file { write setattr };
```

## AppArmor Profiles
**Profile: /etc/apparmor.d/usr.bin.cthulhu**:
```
/usr/bin/cthulhu {
  #include <abstractions/base>

  # Allow compressed state
  /var/lib/rlyeh/** r,

  # Allow REM broadcasting
  network inet dgram,
  network inet6 dgram,

  # Deny escape attempts
  deny /proc/** rw,
  deny /sys/** rw,
  deny /dev/sd* rw,

  # Signal handling
  signal receive set=term,
  signal receive set=kill from root,
}
```

## Capability-Aware System Calls

### capget/capset
Query/set capabilities: capget(2), capset(2)

### prctl(PR_SET_SECUREBITS)
Prevent dropping capabilities or gaining new ones (lockdown).

### setcaps
File-based capabilities:
```bash
setcap CAP_NET_BIND_SERVICE+ep /usr/bin/cthulhu
```

## Security Implications
**Principle of Least Privilege**: Shoggoths run with only CAP_KILL (to each other) and CAP_DAC_OVERRIDE (bypass permissions on bio-matter), not full root.

**Privilege Escalation Prevention**: Even if Cthulhu exploited, lacking CAP_SYS_ADMIN prevents host filesystem mount.

**Container Breakout Defense**: Namespaces + capabilities + seccomp = three-layer ward against entity escape.