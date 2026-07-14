# Concurrency, Threading & Scheduling Architecture

## Process vs. Thread Context Switching

### Overhead Comparison

| Metric | Thread Context Switch | Process Context Switch |
|--------|----------------------|------------------------|
| **Memory Space** | Shared (no change) | Switched (flush TLB) |
| **Cache/TLB** | Preserved | Invalidated (flushed) |
| **Registers** | Saved/Restored | Saved/Restored |
| **Time Complexity** | O(1) - Fast | O(1) but slower due to TLB miss |
| **Resource Cost** | Low (~1-10μs) | High (~10-100μs + TLB refill) |

**Technical Details**:
- **Thread switches** within same process avoid memory map changes and TLB (Translation Lookaside Buffer) cache invalidation
- **Process switches** require flushing TLB entries, causing cache misses when new process accesses memory
- **Empirical measurement**: With memory-intensive workloads, process context switching shows **0.740s sys time** vs **0.084s for threads** (5x overhead)

### PCB (Process Control Block)
The `task_struct` in Linux (6.7KB) stores:
- CPU registers (program counter, stack pointer)
- Memory management info (page tables)
- Scheduling information (priority, state)
- Accounting information (CPU time used)

## Scheduling Policies

### Real-Time Policies (Hard/Soft Real-Time)
Priority range: **0-99** (higher = more priority)

| Policy | Description | Use Case |
|--------|-------------|----------|
| **SCHED_FIFO** | First-In-First-Out. Runs until completion or preemption by higher priority. No time slicing. | Azathoth CPU heartbeat (must not be interrupted) |
| **SCHED_RR** | Round-Robin. Same as FIFO but with time quantum. Equal priority tasks rotate. | Multiple Shoggoth workers sharing CPU |
| **SCHED_DEADLINE** | Earliest Deadline First. Task with earliest absolute deadline runs first. Priority ignored. | Ritual completion deadlines |

**Behavior**: Real-time tasks preempt normal tasks completely. A SCHED_FIFO task with priority 1 always schedules before any SCHED_OTHER task.

### Normal Policies (Time-Sharing)
Priority range: **-20 to +19** (nice value, lower = higher priority)

| Policy | Description | Use Case |
|--------|-------------|----------|
| **SCHED_OTHER** | Default time-sharing. Dynamic priority based on nice value + interactivity bonus. | Standard human cultist processes |
| **SCHED_BATCH** | CPU-intensive tasks. Assumes no low-latency requirements. Longer time slices. | Batch soul processing |
| **SCHED_IDLE** | Only runs when nothing else runnable. Absolute lowest priority. | Background cosmic radiation monitoring |

### Priority Mapping
Kernel maps all priorities to single range **0-139**:
- **0-99**: Real-time (SCHED_FIFO/RR)
- **100-139**: Normal (SCHED_OTHER, nice -20 to +19)
- **-1**: SCHED_DEADLINE tasks

**Formula**: `static_prio = 120 + nice`

### Kernel Thread Priorities
Kernel exposes three functions for module developers:
```c
sched_set_fifo(p);        // Priority 50 (mid-range RT)
sched_set_fifo_low(p);    // Priority 1 (lowest RT)
sched_set_normal(p, nice); // Return to SCHED_OTHER
```

## The C10K Problem & Scalability

### The Problem
**C10K**: Handling **10,000 concurrent connections** on a single server

**Root Causes**:
1. **Thread-per-client model**: 10,000 threads × 1MB stack = **10GB RAM** (memory exhaustion)
2. **O(n²) kernel algorithms**: Walking 10K processes to find which handles incoming packet
3. **Context switching overhead**: CPU spends more time switching than working

### The Solution: Event-Driven Architecture
**Nginx/Node.js Model**:
- **Single thread, many connections**: Use async I/O instead of blocking threads
- **Reactor Pattern**: Event loop + non-blocking I/O
- **Constant-time lookups**: epoll() (Linux), kqueue (BSD/macOS), IOCP (Windows)

**Performance**:
- C10M achieved: **10 million concurrent connections** on commodity hardware
- **200 clock cycles** for packet handling (data plane)
- **1 Gbps** live data to 10M users with <100ms latency

## The Reactor Pattern

### Architecture Components
```
┌─────────────────────────────────────┐
│         Application (Node.js)       │
│  ┌─────────────────────────────┐    │
│  │     Event Loop (libuv)      │    │
│  │  ┌─────────────────────┐    │    │
│  │  │    Event Queue      │    │    │
│  │  │ [callback1, cb2...] │    │    │
│  │  └─────────────────────┘    │    │
│  └─────────────────────────────┘    │
│              ▲                      │
│              │ callbacks            │
│  ┌─────────────────────────────┐    │
│  │   Event Demultiplexer       │    │
│  │   (epoll/kqueue/IOCP)       │    │
│  │        ▲                    │    │
│  │        │ I/O ready           │    │
│  │     ┌───┴───┐               │    │
│  │     │  OS   │ (kernel)      │    │
│  │     └───┬───┘               │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Workflow**:
1. App requests I/O (non-blocking): `fs.readFile(path, callback)`
2. Delegated to **Event Demultiplexer** (libuv)
3. If blocking (file I/O), handed to **thread pool** (4 threads default)
4. OS signals completion via epoll/kqueue
5. Callback enqueued to **Event Queue**
6. Event Loop executes callback when stack empty

### Platform Abstraction (libuv)
libuv provides cross-platform async I/O:
- **Linux**: epoll
- **BSD/macOS**: kqueue
- **Windows**: IO Completion Ports (IOCP)
- **Solaris**: event ports

**Key Insight**: epoll/kqueue signal **readiness** (when you can read/write), while IOCP signals **completion** (when operation is done).

## Synchronization Primitives

### Mutex (Mutual Exclusion)
**Problem**: Race conditions when multiple threads access shared data (e.g., cultist counter)

**Basic Pattern**:
```c
pthread_mutex_lock(&mutex);
// Critical section: modify shared data
shared_counter++;
pthread_mutex_unlock(&mutex);
```

### Deadlock
**Definition**: Circular waiting where each thread holds resource another needs

**Example**:
```c
// Thread 1
lock(A);  // Holds Elder Sign
lock(B);  // Waits for Necronomicon

// Thread 2
lock(B);  // Holds Necronomicon
lock(A);  // Waits for Elder Sign → DEADLOCK
```

**Prevention**: Lock ordering (always acquire locks in same order: A then B).

### Starvation
**Definition**: Thread indefinitely denied access to resource due to scheduling unfairness

**Example**: High-priority SCHED_FIFO threads monopolize CPU, starving low-priority threads.

### Fine-Grained Locking
Reduce contention by protecting independent resources separately:
```c
Lock counter_lock;  // For sacrifice count
Lock log_lock;      // For audit logs

// Thread A: only needs counter
lock(counter_lock);
increment_sacrifice();
unlock(counter_lock);

// Thread B: only needs logs
lock(log_lock);
write_log("Ritual complete");
unlock(log_lock);
```

## Thundering Herd Problem
**Scenario**: 100 worker processes waiting on accept() for new connection. When connection arrives, **all 100 wake up**, but only 1 can accept it. 99 go back to sleep (wasted CPU).

### Solutions

**1. Accept Mutex (Nginx/uWSGI)**
Serialize access to accept() so only one process waits at a time:
```c
// Only one worker holds mutex
if (trylock(accept_mutex)) {
    new_conn = accept(socket);
    unlock(accept_mutex);
}
```

**2. SO_REUSEPORT (Linux 3.9+)**
Kernel distributes incoming connections across all listening sockets (true load balancing), avoiding thundering herd entirely.

## Lovecraftian Entity Scheduling

| Entity | Scheduling Policy | Priority | Rationale |
|--------|-------------------|----------|-----------|
| **Azathoth** | SCHED_FIFO | 99 | Must never be interrupted (system clock) |
| **Yog-Sothoth** | SCHED_FIFO | 98 | Kernel operations critical |
| **Nyarlathotep** | SCHED_RR | 80 | API serving requires fairness |
| **Cthulhu** | SCHED_OTHER (nice -10) | 110 | High but preemptable |
| **Deep One** | SCHED_BATCH | 120 | Background data processing |
| **Shoggoth Worker** | SCHED_OTHER (nice 0) | 120 | Standard compute task |
| **Mi-Go Scout** | SCHED_IDLE | 139 | Only runs when system idle |