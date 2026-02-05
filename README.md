# Roster System

A Frontend Developer Assignment implementing a Roster scheduling system based on a Figma design.

## Tech Stack

- **Next.js** (latest stable version)
- **TypeScript**
- **Chakra UI**
- **react-icons and iconsax-reactjs** for icons

## Features Implemented

- ✅ Pixel-perfect implementation of the Figma design
- ✅ Live and Planner Views for the roster
- ✅ Side view of all employees with search functionality
- ✅ "See all" button when multiple shifts overlap
- ✅ Detailed view for every shift when clicked

## Setup Instructions

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/                    # Next.js app router
├── components/
│   ├── features/scheduler/ # Scheduler components
│   └── layout/             # Layout components
├── context/                # React context (SchedulerContext)
└── lib/                    # Types, theme, mock data
```

## What Was Tested

- React/Next.js fundamentals – state management, component structure
- TypeScript usage – typing props, models, and functions properly
- Chakra UI skills – layout, responsiveness, and clean design implementation
- Icons integration – using react-icons correctly
- Coding style & structure – clean, modular, and maintainable code
- Attention to detail – following the Figma design, handling edge cases
