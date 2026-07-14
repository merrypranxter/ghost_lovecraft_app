# Database Internals: The Yithian Archive Architecture

## Overview
The Great Race of Yith maintains a **temporal consciousness database** storing all minds throughout history. This requires extreme scale (billions of consciousnesses), high durability (must survive tectonic shifts), and temporal querying (access any point in time). The implementation uses **B+ Tree indexing**, **Write-Ahead Logging (WAL)**, and **Multi-Version Concurrency Control (MVCC)**.

## B+ Tree Index Structure

### Architecture
The Yithian database uses **B+ Trees** (not B-Trees) for indexing temporal coordinates:

```
        [Root Node]
    [500AD|1000AD|1500AD]
     /      |       \
[Branch] [Branch] [Branch]
[200|400] [600|800] [1200|1400]
 /  |  \  /  |  \  /  |  \
[Leaf][Leaf][Leaf][Leaf][Leaf][Leaf][Leaf]
100  300  500  700  900  1100  1300
```

**Key Difference from B-Trees**: In B+ Trees, all data pointers (consciousness records) exist only in **leaf nodes**. Internal nodes store only keys for routing.

### Node Specifications
**Page Size**: 8KB per node (Postgres standard)
- **Degree (m)**: Maximum children per node
- **Fill Factor**: Typically 50-67% full to allow for splits/merges

**Node Types**:
1. **Root Node**: Contains pointers to branch nodes. Only one per index.
2. **Branch Nodes**: Store routing logic (key ranges) pointing to other branches or leaves.
3. **Leaf Nodes**: Store actual index items (consciousness pointers) with horizontal links to adjacent leaves for fast range scans.

### Index Items
Each entry in a leaf node contains:
- **Key Value**: Temporal coordinate (e.g., "1926-03-15T14:32:00Z")
- **Row ID (TID)**: Tuple ID pointing to physical location in heap (page + offset)
- **Horizontal Pointer**: Link to next leaf node (enables O(n) range scans without tree traversal)

### Search Complexity
**O(log n)** for exact lookups:
1. Start at root, compare key with node entries
2. Follow pointer to appropriate child (branch or leaf)
3. Continue until reaching leaf node
4. Binary search within leaf to find exact record

**Range Queries**: O(log n + m) where m is result set size (leverage leaf node linked list).

### Insertion & Splits
When inserting into a full leaf node (8KB capacity reached):
1. **Page Split**: Create new leaf, move half the entries
2. **Parent Update**: Add separator key to parent branch node
3. **Cascading Splits**: If parent full, split propagates up to root (tree height increases)

**Optimization**: Sequential temporal inserts (monotonically increasing) are most efficient because they append to rightmost leaf, minimizing splits.

## Write-Ahead Logging (WAL)

### Durability Mechanism
The Yithian archive guarantees **ACID durability** through WAL:
1. **Log First**: All changes written to append-only log before touching data files
2. **Force to Disk**: Log flushed to persistent storage (Great Library stone tablets) before transaction commits
3. **Asynchronous Apply**: Data files updated later (lazy write)
4. **Crash Recovery**: Replay log to restore committed transactions

### WAL Record Structure
Each log entry contains:
- **Transaction ID**: Which consciousness transfer this belongs to
- **Page ID**: Which stone tablet page modified
- **Operation Type**: INSERT, UPDATE, DELETE consciousness
- **Before Image**: Previous state (for UNDO)
- **After Image**: New state (for REDO)
- **LSN (Log Sequence Number)**: Monotonic counter for ordering

### Recovery Process
When the Great Library reboots after tectonic shift:
1. **Analysis Phase**: Scan WAL to find last checkpoint and in-flight transactions
2. **Redo Phase**: Replay all committed transactions that didn't reach data files
3. **Undo Phase**: Roll back incomplete transactions (consciousness transfers interrupted by catastrophe)

**Performance Advantage**: Sequential append-only writes are vastly faster than random disk seeks.

## Multi-Version Concurrency Control (MVCC)

### Problem: Temporal Readers vs. Consciousness Writers
When a Yithian researcher queries consciousnesses from 1000 AD (long-running read) while new transfers are being archived (concurrent writes), traditional locking would block either reader or writer.

### Solution: Snapshot Isolation
MVCC creates **snapshots** of consciousness data at transaction start:
- **Readers**: See consistent point-in-time view (snapshot), unaffected by concurrent writes
- **Writers**: Create new versions without blocking readers
- **Garbage Collection**: Vacuum process removes obsolete versions older than oldest active snapshot

### Implementation Details
Each consciousness record (tuple) contains versioning metadata:
- **xmin**: Transaction ID that created this version
- **xmax**: Transaction ID that deleted/obsoleted this version (NULL if current)
- **cmin/cmax**: Command IDs within transaction

**Visibility Rules**: A tuple is visible to current transaction if:
1. `xmin` is committed and `xmin < current_txid`
2. `xmax` is NULL or `xmax > current_txid` or `xmax` is aborted

### Vacuum Process (Great Library Maintenance)
The **autovacuum daemon** periodically scans for dead tuples:
- **Dead Tuple**: Version no longer visible to any active transaction (older than all `current_txid`)
- **Free Space Map**: Reclaimed space marked for reuse
- **Full Vacuum**: Rewrites pages to eliminate fragmentation (requires exclusive lock on tablet)

### Isolation Levels

| Level | Behavior | Use Case |
|-------|----------|----------|
| **Read Committed** | Snapshot reset after each statement | Standard Yithian research |
| **Repeatable Read** | Single snapshot for entire transaction | Historical consistency checks |
| **Serializable** | Strict ordering preventing all anomalies | Critical timeline corrections |

**Trade-off**: MVCC improves read concurrency but increases storage overhead (multiple versions maintained temporarily) and requires vacuum maintenance.

## Temporal Sharding
Given the timespan (4+ billion years of Earth history), the database uses **range sharding**:
- **Shard 1 (Pre-Cambrian)**: 4.5 BYA - 541 MYA (Australia)
- **Shard 2 (Paleozoic)**: 541 MYA - 252 MYA (Antarctica)
- **Shard 3 (Mesozoic)**: 252 MYA - 66 MYA (Yuggoth)
- **Shard 4 (Cenozoic)**: 66 MYA - present (Antarctica backup)

Each shard is an independent B+ Tree with WAL, coordinated via distributed consensus (Raft).