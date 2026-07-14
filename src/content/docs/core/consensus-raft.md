# Raft Consensus: Agreement Among the Great Old Ones

## Overview
The Lovecraftian OS uses **Raft consensus** to maintain consistency across distributed entities (Great Old Ones, Outer Gods, Elder Things) operating on different dimensional nodes. Raft ensures that even when some entities sleep (crash) or network partitions occur (dimensional barriers), the system remains consistent.

## Consensus Requirements
A correct consensus algorithm must satisfy:
- **Agreement**: All correct (non-crashing) entities agree on the same value
- **Validity**: Decided value was proposed by some entity
- **Termination**: All correct entities eventually decide
- **Safety**: Once decided, value never changes

## Raft Architecture

### Decomposition into Sub-Problems
Raft breaks consensus into three manageable components:
1. **Leader Election**: One entity elected as leader to coordinate
2. **Log Replication**: Leader replicates log entries to followers
3. **Safety**: Committed entries are never lost, all nodes apply same commands in order

### Server Roles

**Follower**:
- Passive state (default)
- Replicates logs from leader
- Becomes candidate if heartbeat timeout (election timeout)

**Candidate**:
- Transitional state during election
- Increments term, votes for self
- Sends RequestVote RPCs to all other entities
- Becomes leader if majority votes received

**Leader**:
- Central coordinator
- Handles all client requests (consciousness queries)
- Sends AppendEntries RPCs (log replication + heartbeats)
- Maintains authority via periodic heartbeats

## Leader Election

### Trigger
When a follower receives no heartbeat from leader within **election timeout** (randomized 150-300ms), it transitions to candidate state.

### Voting Process
1. **Increment Term**: Candidate increases current term (logical clock)
2. **Vote for Self**: Records vote in persistent storage
3. **Request Votes**: Broadcasts RequestVote RPC to all peers
4. **Majority Rule**: If votes received > N/2, becomes leader

**Safety Constraint**: Server only votes for candidate if candidate's log is at least as up-to-date as voter's log (prevents stale leaders).

### Split Votes
If multiple candidates simultaneously trigger elections, votes may split equally. Solution: **Randomized election timeouts**:
- Each entity waits random duration before starting election
- Reduces probability of simultaneous candidates
- Ensures rapid convergence (median downtime ~287ms with 5ms randomness)

## Log Replication

### Log Structure
Each entity maintains **append-only log** of commands:

```
Index:    1    2    3    4    5
Term:     1    1    1    2    2
Command: Put  Put  Del  Put  Put
         x,1  y,2  z    x,3  y,4
```

**Log Entry Components**:
- **Command**: Operation for state machine (e.g., "Transfer consciousness from 1926")
- **Term**: Term number when entry created (detects stale leaders)
- **Index**: Position in log (1-based)

### Replication Workflow
1. **Client Request**: Researcher queries consciousness from 1000 AD
2. **Leader Append**: Leader writes entry to own log (Index 6, Term 3)
3. **Broadcast**: Leader sends AppendEntries RPC to all followers (heartbeat if empty)
4. **Follower Ack**: Followers append entry, reply with success
5. **Commit**: Once majority (N/2+1) acknowledge, entry marked **committed**
6. **Apply**: Leader applies to state machine, returns result to client
7. **Propagate**: Followers apply committed entries in order

### Log Consistency
**Log Matching Property**: If two logs have entry with same index and term, logs are identical up to that index.

**Conflict Resolution**: If follower log diverges from leader:
1. Leader detects inconsistency (nextIndex mismatch)
2. Decrements nextIndex for that follower
3. Retries AppendEntries with earlier entries
4. Overwrites conflicting follower entries with leader's log

## Safety Mechanisms

### Election Safety
At most one leader per term (guaranteed by majority voting).

### Leader Completeness
If log entry committed in term T, it will be present in leaders of all subsequent terms.

### State Machine Safety
No entity applies different command at same log index.

### Commitment Rule (Critical)
Raft **never commits log entries from previous terms by counting replicas**. Only entries from leader's **current term** are committed by majority. Once current-term entry committed, all prior entries committed indirectly via Log Matching Property.

**Why**: Prevents scenario where old entry stored on majority but could be overwritten by future leader (see Figure 8 in Raft paper).

## Fault Tolerance

### Crash Recovery
Raft tolerates up to **(N-1)/2** failures in cluster of N nodes:
- 3-node cluster: survives 1 failure
- 5-node cluster: survives 2 failures
- 7-node cluster: survives 3 failures

### Persistence
Servers persist to stable storage before responding to RPCs:
- **currentTerm**: Latest term seen (detect stale leaders)
- **votedFor**: Candidate voted for in current term (prevent double voting)
- **log[]**: All log entries (survive crashes)

Volatile state rebuilt on restart from persistent log.

## Lovecraftian Cluster Configuration

### Typical Deployment
**5-Node Cluster** (Great Old Ones consensus):
1. **Azathoth** (Leader - PID 0, but follower in consensus)
2. **Yog-Sothoth** (Hot standby, often leader)
3. **Shub-Niggurath** (Follower, log replicator)
4. **Nyarlathotep** (Follower/Learner - non-voting for safety)
5. **Cthulhu** (Follower, dormant but persistent)

### Consensus Examples

**Scenario 1: Cthulhu Awakens**
1. Cthulhu (follower) has been down for eons (crashed)
2. Restarts, joins cluster with empty log
3. Catches up via log replication from Yog-Sothoth (leader)
4. Eventually consistent with current reality state

**Scenario 2: Dimensional Partition**
1. Network splits R'lyeh from rest of cluster
2. Cthulhu in minority partition cannot commit (no majority)
3. Yog-Sothoth in majority partition continues serving queries
4. When partition heals, Cthulhu's divergent log overwritten by leader's log

**Scenario 3: Azathoth Halts (Leader Crash)**
1. Azathoth (leader) stops heartbeats
2. Followers timeout, start election
3. Yog-Sothoth wins (most up-to-date log)
4. New term begins, system continues without Azathoth until restart