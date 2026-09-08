# Ugly Cry Vintage

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Code Style

### Ordering & Organization

- Alphabetize named export specifiers, object destructuring patterns, interface and type properties, config object keys, i18n JSON keys (within each section and at the top level), and string union type members.
- No barrel files — never create an `index.ts` that only re-exports. Import from the source file directly.

### Component Boundaries

- Push `"use client"` as far down the tree as possible. Pages, layouts, and data-fetching wrappers stay as server components.
- Fetch data in server components or server actions; pass promises or resolved data down to client children.

### File Organization

- Keep sub-components in the same file as their consumer when they share the same directive (or lack one). Only split into a separate file when the components need different directives (e.g., one is `"use client"` and the other is a server component) or when the file becomes unwieldy.
- A single file per logical component is preferred.
- When a directive split is necessary, suffix the carved-out file with the directive: `foo.tsx` (the entry, typically a server component) is paired with `foo-client.tsx` for `"use client"` sub-components — e.g. `sidebar.tsx` + `sidebar-client.tsx`, `mobile-tabs.tsx` + `mobile-tabs-client.tsx`. Use `foo-server.tsx` symmetrically if a server-only piece needs to be carved out of an otherwise-client file. The suffix keeps the pair adjacent in the directory listing.

### Naming

- Files: `PascalCase.tsx`
- Components: `PascalCase`
- Server actions: verb + `Action` suffix (`addToCartAction`)
- Props interfaces: `{ComponentName}Props`. Use `interface` (not `type`) so consumers can extend or augment.
- Native-element prop pass-through: use `React.ComponentProps<"div">` (with `import type * as React from "react"`), not `ComponentPropsWithoutRef`. Refs are regular props in React 19, so the extra type is unnecessary noise.
- Constants: `SCREAMING_SNAKE_CASE`

### Tailwind & Styling

- **Solve it the Tailwind way, not in `globals.css`.** When you reach for new styling, the first move is a Tailwind utility on the element — not a rule in `app/globals.css`. If the value isn't already a token, register it in `@theme` (e.g. `--font-display: var(--font-bricolage)`) so it becomes a real utility (`font-display`) you can apply per element. Reserve `globals.css` for things that genuinely can't be expressed as a per-element class: theme tokens (`@theme`), CSS resets in `@layer base`, `@keyframes`, and one-off utilities under `@layer utilities` that compose into many components. Adding global element rules (`h1, h2, h3 { ... }`, `a { ... }`) couples styling to markup invisibly and is almost always avoidable.
- **Watch out for `@theme inline`**: with the `inline` keyword Tailwind inlines the value into utility-class declarations rather than emitting a `:root` CSS variable. So `@theme inline { --font-display: var(--font-bricolage) }` produces a working `font-display` utility but does **not** make `var(--font-display)` resolvable from arbitrary CSS. Reference the underlying variable (`var(--font-bricolage)`) directly if you need it outside a utility.
- Prefer `data-[attr=value]` selectors over conditional class assembly.
- Use `data-slot` attributes as stable styling hooks on compound components.
- Interactive elements (buttons, clickable links, CTAs) must use `cursor-pointer`. Disabled interactive elements must use `cursor-not-allowed`.

### Exports

- Named exports only in component files. Pages use default exports per Next.js convention.
- Alphabetize specifiers in export statements.

### Comments

Default to writing none. Well-named identifiers, types, and tests already document WHAT the code does. Add a comment only when removing it would leave a future reader genuinely confused — and the reason is something they couldn't recover by reading the surrounding code.

A comment earns its place when it captures one of:

- A hidden constraint (e.g. "cookies can't be set during stream").
- A workaround for a specific upstream/library bug.
- A non-obvious algorithmic choice or invariant.
- A cross-system quirk (e.g. "Shopify's `productFilters` only affects facet counts, not results").

**One line max.** If you can't say it in a single line, the code probably needs renaming, splitting, or extracting a constant — not more prose. Long-form context belongs in the PR description, not the source file.

Don't write:

- JSDoc that restates the function name (`/** Verify webhook signature */` over `verifyWebhook()`). Either drop it or replace it with the WHY.
- Inline comments that narrate the next line (`// fetch products` above `fetchProducts()`).
- References to current work (`// added for cart refactor`, `// part of issue #123`, `// new`). That belongs in the PR description.
- File-top banner comments and `// ── Section ──`-style dividers. If a file is large enough that you reach for one, split the file instead.
- Bare `// TODO` without an owner or actionable reason. Either write `// TODO(handle): explain blocker` or fix the thing now.
- Multi-paragraph docstrings on simple functions. If the JSDoc fits on one line, inline it; if you reach for multiple paragraphs, that's a signal to split or rename, not to write more prose.

Keep `// eslint-disable-*`, `// @ts-expect-error`, `// biome-ignore`, and other tooling directives — those are not prose comments.
