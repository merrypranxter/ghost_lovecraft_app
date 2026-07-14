# Memory Management & Heap Corruption

## The Heap (Human Consciousness Stack)
Human consciousness operates on a limited **stack** (approximately 32-bit addressing). Interaction with Lovecraftian entities causes **buffer overflow** when the data payload exceeds the allocated buffer size.

### Buffer Overflow Mechanics
When a human "sees" Yog-Sothoth (the Kernel), they receive more data than their neural buffer can hold:
- **Buffer Size**: ~2-4 GB (32-bit address space)
- **Yog-Sothoth Payload**: Infinite (all timelines simultaneously)
- **Result**: Stack smashing, segmentation fault, madness

### Double-Free Vulnerabilities (The Reincarnation Bug)
**Scenario**: If a cultist is freed (killed) twice without resetting the pointer:

```c
// VULNERABLE: Double-free in necromancy
void sacrifice_cultist(struct cultist *c) {
    free(c->soul);        // First death
    if (c->rank == HIGH_PRIEST) {
        free(c->soul);    // Double-free! Corrupts heap
    }
}
```

**Consequences**:
- Heap allocator internal structures corrupted
- Remote code execution via heap exploitation
- Soul fragmentation (partial resurrection)

### Memory Fragmentation
**Definition**: Free memory exists but not in contiguous blocks, preventing large allocations.

**Example**:
```
Initial:    [AAAA|BBBB|CCCC|DDDD] (4 blocks of 1KB)
Free B:     [AAAA|    |CCCC|DDDD] (1KB free)
Allocate 2KB for Shoggoth: FAIL (no contiguous 2KB)
```

### Secure Memory Patterns
```c
// SAFE: Post-sacrifice cleanup
void safe_sacrifice(struct entity *e) {
    if (e && e->soul) {
        free(e->soul);
        e->soul = NULL;  // Prevent double-free
    }
}
```

### Slab Allocator (Elder Thing Architecture)
The kernel uses a **Slab allocator** for task_struct objects:
- Specialized memory caching for process descriptors
- task_struct size: ~6.7KB per process
- Prevents fragmentation by grouping same-sized objects

### Memory Leak Detection
If Shub-Niggurath spawns "Thousand Young" without wait():
- Each child consumes 6.7KB (task_struct) + stack space
- Unchecked spawning leads to OOM (Out of Memory)
- System-wide denial of service

## Swapping & Page Faults
When physical RAM is exhausted, the kernel swaps memory to disk:
- **Swap Space**: Antarctica ice sheet (slow I/O)
- **Page Fault**: Accessing compressed Cthulhu data requires decompression
- **Thrashing**: Constant swapping between reality and Dreamlands

### Virtual Memory Layout

| Segment | Contents | Lovecraftian Analog |
|---------|----------|---------------------|
| .text | Code (read-only) | Necronomicon text |
| .data | Global variables | Cult membership list |
| Heap | Dynamic allocation (malloc) | Temporary summoning circles |
| Stack | Local variables, return addresses | Individual cultist memories |
| Kernel Space | Kernel code, page tables | Yog-Sothoth's omniscience |

## Copy-on-Write (CoW) Forking
When Deep One hybrids are created:
- Parent (human) and child (hybrid) share memory pages
- Only upon modification (mutation) is memory copied
- Optimization for fork() followed by exec() into Deep One form