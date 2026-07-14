# Filesystem Architecture: The Necronomicon as System Documentation

## Overview
The Lovecraftian OS uses a **hierarchical filesystem** analogous to ext4, with the **Necronomicon** serving as the primary system API reference (like `man` pages), and **Pnakotic Manuscripts** functioning as temporal logs (rotated historical records).

## Disk Layout & Block Groups
The reality filesystem divides storage into **Block Groups**—self-contained units of approximately 128MB (32,768 blocks at 4KB each). A 1TB consciousness storage would contain roughly 8,000 block groups.

### Block Group Structure
```
Block Group N:
├── Superblock (backup)          # Filesystem metadata
├── Group Descriptor Table       # Block group locations
├── Block Bitmap                 # Free/used data blocks
├── Inode Bitmap                 # Free/used inodes
├── Inode Table                  # File metadata array
└── Data Blocks                  # Actual content
```

## The Inode: Entity Metadata
Every entity (file, directory, Great Old One) in the system is represented by an **inode**—a 256-byte data structure containing:

| Field | Size | Description | Lovecraftian Analog |
|-------|------|-------------|---------------------|
| `i_mode` | 2 bytes | File type & permissions | Entity classification (Outer God, Great Old One, Human) |
| `i_uid` | 2 bytes | Owner ID | Azathoth (root) or Yog-Sothoth (kernel) |
| `i_size` | 4 bytes | File size in bytes | Consciousness storage capacity |
| `i_atime` | 4 bytes | Last access time | Last invocation |
| `i_mtime` | 4 bytes | Last modification time | Last spell update |
| `i_ctime` | 4 bytes | Last status change | Last dimensional shift |
| `i_links_count` | 2 bytes | Hard link count | Number of cults worshipping entity |
| `i_blocks` | 8 bytes | Block count (512-byte units) | Memory allocation in 512-byte chunks |
| `i_block[15]` | 60 bytes | Extent tree root | Physical location on disk |

### Special Inodes
- **Inode 1**: Bad blocks (reserved for corrupted sectors)
- **Inode 2**: Root directory `/` (Yog-Sothoth, the Gate)
- **Inode 11**: `lost+found` (repository for recovered souls after filesystem crash)
- **Inode 12+**: User entities (Cthulhu, Hastur, etc.)

## Directory Structure: The Tree of Knowledge
Directories are **special files** containing name-to-inode mappings:

```c
struct ext4_dir_entry_2 {
    __le32 inode;           /* Inode number */
    __le16 rec_len;         /* Directory entry length */
    __u8 name_len;          /* Name length */
    __u8 file_type;         /* Type cache (file/dir/symlink) */
    char name[255];         /* Entity name */
};
```

### HTree Indexing: Fast Lookup
Large directories (like the **Cult of Cthulhu** membership rolls) use **HTree** indexing—hash-based B-trees for O(log n) lookup instead of O(n) linear scanning.

## Hard Links vs. Symbolic Links

### Hard Links (Multiple Names, Same Entity)
- Multiple directory entries point to the same inode
- Reference counted (i_links_count)
- Cannot cross filesystem boundaries
- **Example**: Cthulhu is known as "The Sleeper" and "The Dreamer"—two names, one entity (inode)

### Symbolic Links (Pointers to Other Names)
- Separate inode containing target path
- Can point to non-existent entities (dangling symlinks)
- Can cross filesystems
- **Example**: "The King in Yellow" is a symlink to Hastur's true form

## Extent Trees: Mapping Entity Memory
Modern Lovecraftian OS uses **extent-based allocation** rather than direct block pointers:

```c
struct ext4_extent {
    __le32 ee_block;        /* First logical block */
    __le16 ee_len;          /* Length (max 32,768 blocks = 128MB) */
    __le16 ee_start_hi;     /* Physical block high bits */
    __le32 ee_start_lo;     /* Physical block low bits */
};
```

For Cthulhu's 4.3GB compressed form, the extent tree maps logical blocks to physical blocks on R'lyeh's storage (Wilkes Land anomaly).

## The Superblock: Cosmic Metadata
Located at offset 1024 bytes from disk start, the superblock contains:
- Block size (typically 4KB)
- Total block count
- Free block count
- Free inode count
- First data block location

**Backup superblocks** exist in block groups 0, 1, and powers of 3, 5, and 7 (3, 5, 7, 9, 25, 27, 49, 81, 125, 243, 343...) for recovery after corruption (reality failure).

## Filesystem Check: fsck for the Soul
When reality crashes, fsck (filesystem check) scans for:
- **Orphaned inodes**: Entities with no directory entries (lost souls)
- **Dangling directory entries**: Pointers to deleted inodes (dead cults)
- **Superblock corruption**: Rewrites from backup (reality reboot)
- **Extent tree damage**: Rebuilds from leaf nodes (memory reconstruction)