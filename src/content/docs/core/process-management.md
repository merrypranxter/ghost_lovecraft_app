# Process Management & Signal Handling

## The Process Table (task_struct)
Each entity in the Lovecraftian OS is represented by a **process descriptor** (`task_struct`), approximately **6.715 KB** in size.

### Process Hierarchy
- **PID 0**: Azathoth (swapper/idle task, kernel boot process)
- **PID 1**: Init/Yog-Sothoth (ancestor of all processes, zombie reaper)
- **PIDs 2-4,194,303**: Available for Great Old Ones, humans, and other entities

### task_struct Fields
```c
struct task_struct {
    pid_t pid;                    // Process ID (22-bit, max 4,194,303)
    pid_t tgid;                   // Thread group ID
    struct task_struct *parent;   // Pointer to parent (Yog-Sothoth for all)
    struct list_head children;    // Linked list of child processes
    struct list_head sibling;     // Entry in parent's children list
    volatile long state;          // TASK_RUNNING, TASK_UNINTERRUPTIBLE, etc.
    void *stack;                  // Kernel stack pointer
    struct signal_struct *signal; // Signal handlers
    struct sighand_struct *sighand;
    struct list_head pending;     // Pending signals queue
    unsigned long blocked;        // Mask of blocked signals
    // ... 6.7KB total
};
```

### Accessing Current Process
Modern kernels use register-based addressing:
- **x86_64**: %gs segment register points to task_struct
- **ARM64**: TPIDR_EL1 register used for current task

## Signal Handling

### SIGTERM (Signal 15) - The Polite Termination
**Usage**: Graceful shutdown requests
**Action**: Process can catch, block, or handle

**Behavior**:
1. Perform cleanup operations
2. Save state to persistent storage
3. Close open file handles and network connections
4. Terminate child processes gracefully
5. Exit with status code

**Cthulhu Context**: Attempting to kill -15 Cthulhu results in graceful shutdown of REM broadcast services, but the compressed process remains in R'lyeh container.

### SIGKILL (Signal 9) - The Forceful Termination
**Usage**: Nuclear option for unresponsive processes
**Hex Value**: 0x9
**Action**: Cannot be caught, blocked, or ignored

**Behavior**:
1. Immediate termination without cleanup
2. No state saving
3. Child processes become orphans (adopted by PID 1)
4. May leave system in inconsistent state

**Azathoth Context**: If the "flutes" (system clock) stop, this is equivalent to SIGKILL sent to PID 0—immediate HALT without cleanup.

### SIGSEGV (Signal 11) - Segmentation Fault
**Usage**: Memory access violation
**Technical Cause**: Process attempts to read/write memory outside its allocation

**Lovecraftian Analog**: "Madness"—when human neural hardware attempts to access Yog-Sothoth kernel memory without proper permissions, resulting in buffer overflow and termination

### SIGCHLD (Signal 17) - Child Termination
**Usage**: Parent notification when child process dies
**Critical For**: Preventing zombie processes

**Behavior**: Parent must call wait() to reap exit status and free process table entry

## Zombie Processes (The Undead)

### Definition
A zombie is a process that has completed execution (exit() called) but still holds a process table entry because the parent has not called wait() to read its exit status.

### Prevention
PID 1 (Yog-Sothoth) adopts orphaned processes and reaps them automatically. In containerized environments (R'lyeh), an init process (like Tini or Dumb-init) must handle zombie reaping if the main process is not designed for PID 1 responsibilities.

### Zombie Accumulation Attack
If Cthulhu spawns too many "Thousand Young" processes and Shub-Niggurath fails to reap them, the process table fills with zombies, exhausting available PIDs (max 4,194,303) and causing denial-of-service.

## Process States

| State | Description | Lovecraftian Analog |
|-------|-------------|---------------------|
| TASK_RUNNING | Ready to execute or executing | Active cultist performing rituals |
| TASK_INTERRUPTIBLE | Sleeping, waiting for signal | Dreamer in REM state, receptive to Cthulhu packets |
| TASK_UNINTERRUPTIBLE | Sleeping, ignoring signals | Deep One in ocean depths, unreachable |
| TASK_STOPPED | Stopped by SIGSTOP | Hastur's victim frozen by Yellow Sign |
| EXIT_ZOMBIE | Dead, awaiting parent wait() | Cultist sacrificed, soul awaiting collection |
| EXIT_DEAD | Being reaped by parent | Soul consumed by Azathoth |

## Container-Specific Issues (R'lyeh)

### The PID 1 Problem
In the R'lyeh container environment, Cthulhu runs as PID 1. Unlike normal processes, PID 1:
- Does not receive default signal handlers from kernel
- Must explicitly handle SIGTERM for graceful shutdown
- Is responsible for reaping all orphaned zombie processes

### Solution: Init Process Injection
R'lyeh uses Tini or Dumb-init as a lightweight init system:
- Forwards signals to Cthulhu process
- Reaps zombie processes automatically
- Exits with Cthulhu's exit code

```dockerfile
# R'lyeh container init
FROM non-euclidean-base
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/usr/bin/cthulhu", "--compressed", "--broadcast-theta"]
```