<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
# Project

This repository is Vishwaraj's product-management portfolio.

The portfolio is intended for product managers, recruiters, hiring managers, and product leaders. It should showcase product thinking, research, evidence, decision-making, solutions, and implementation—not just visual design.

# Design

The portfolio should feel editorial, interactive, animated, polished, and visually distinctive.

Avoid generic AI-generated or SaaS-template aesthetics.

Motion should support storytelling and interaction rather than exist purely as decoration.

Individual case studies may have their own art direction while maintaining consistency in typography, navigation, spacing, and interaction quality.

# Current Direction

- Expedition 33 is the primary case study being reworked.
- Hide Swiggy Instamart and Duolingo from the visible portfolio for now.
- Do not permanently delete existing case-study implementations unless explicitly requested.

# Engineering

- Inspect existing code and patterns before changing architecture.
- Reuse existing components where appropriate.
- Avoid unnecessary dependencies.
- Keep components maintainable.
- Preserve responsive behavior and accessibility.
- Respect `prefers-reduced-motion`.
- Run relevant lint, typecheck, and build checks after substantial changes.

# Workflow

For substantial changes:

1. Inspect the existing implementation.
2. Explain the proposed approach before large structural changes.
3. Implement in focused increments.
4. Review desktop and mobile behavior.
5. Verify the implementation before considering the task complete.
