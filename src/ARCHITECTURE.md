# Import Architecture — 4-Layer Hierarchy (ARCH5)

Imports must flow strictly downward through these layers. Never skip layers or import upward.

```
components/  →  hooks/  →  services/  →  types/
```

> Arrow convention: `A → B` means **A imports from B** (A depends on B).

`lib/` is a shared utility layer available to all layers (no position in the chain).
Entry-point files (`src/App.tsx`, `src/main.tsx`) follow component-layer rules.

---

## Rules

| Layer | Folder | May import from |
|---|---|---|
| 1 | `components/` | `hooks/`, `types/`, `lib/` |
| 2 | `context/` | `hooks/`, `types/`, `lib/` |
| 3 | `hooks/` | `services/`, `types/`, `lib/` |
| 4 | `services/` | `types/`, `lib/` |
| 5 | `types/` | nothing (pure type definitions only) |
| — | `lib/` | external packages only (no internal layer imports) |

---

## Critical Constraint

`components/` and `context/` **must never** import directly from `services/`. All data access goes through `hooks/`.

Violations are a bad portfolio signal and break the separation of concerns that makes this codebase testable.
