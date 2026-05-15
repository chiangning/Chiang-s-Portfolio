# Site Structure

This document serves as the architectural map and URL registry for the static Next.js site. 

## Primary Pages
- **Home** (`/`) - Main landing page with project overview.
- **Architecture** (`/architecture`) - Professional value proposition for architectural services.
- **Project Management** (`/project-management`) - Approaches to project governance.
- **AI Expertise** (`/ai-expert`) - AI augmentation and custom workflows.
- **Resources** (`/resources`) - Grid of articles and tools.

## Project Detail Pages
Each project is dynamically pre-rendered at build time.
- `/project/tropicana-portfolio`
- `/project/monash-science`
- `/project/christway-college`
- `/project/wellington-childcare`
- `/project/the-mark-elsternwick`
- `/project/casey-hospital`
- `/project/glenroy-college`

## Resource Detail Pages
Each article is dynamically pre-rendered at build time.
- `/resources/ai-architecture-workflows`
- `/resources/portfolio-governance-strategies`
- `/resources/construction-cost-update-march-2026`
- `/resources/ai-gantt-chart`
- `/resources/agent-skills-architectural-workflows`

## Technical Details
- **Framework:** Next.js (App Router)
- **Rendering:** Static Site Generation (SSG). All routes are pre-rendered into static `.html` files at build time (`next build`).
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (via pre-rendered Client Components)
