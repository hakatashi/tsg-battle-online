# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Firebase emulators and function building
- `npm run build` - Build the application for production
- `npm run test` - Run tests with Firebase emulators
- `npm run test:vitest` - Run Vitest tests (requires emulators to be running)
- `npm run lint` - Run Biome linter with auto-fix
- `npm run format` - Format code with Biome
- `npm run fix` - Format and lint code with unsafe fixes

## Architecture Overview

This is a SolidStart application with Firebase backend:

### Tech Stack

- **Frontend**: Solid.js with SolidStart (SSR framework)
- **Backend**: Firebase (Firestore, Auth, Functions, Hosting)
- **Build Tool**: Vinxi
- **Testing**: Vitest with Firebase emulators
- **Linting**: Biome

### Project Structure

- `src/` - Main application source
  - `app.tsx` - Root app component with Firebase and Router providers
  - `routes/` - File-based routing
  - `lib/` - Shared utilities and Firebase integration
    - `firebase.ts` - Firebase configuration and initialization
    - `schema.d.ts` - TypeScript type definitions
    - `Collection.tsx` - Reusable component for displaying Firestore collections
- `functions/` - Firebase Cloud Functions (separate Node.js project)
- `public/` - Static assets
- `firestore.rules` - Firestore security rules

### Key Components

- Uses `solid-firebase` for Firebase integration with Solid.js
- Firebase emulators for local development (Auth: 9099, Firestore: 8080, Hosting: 5000)
- Anonymous authentication for users
- Type-safe Firestore queries using TypeScript interfaces

### Development Workflow

1. Run `npm run dev` to start all services (server, Firebase emulators, functions)
2. Application runs on localhost:3000
3. Firebase emulators provide local backend services
4. Functions are built and watched for changes

### Testing

- Tests require Firebase emulators to be running
- Use `npm test` to start emulators and run tests together

## Best Practices

### TypeScript

- Avoid using `any` type. Prefer specific types or `unknown` when necessary

### TypeScript with Firestore

- When using `doc()` with `useFirestore`, type the document reference properly:
  ```typescript
  const game = useFirestore(
    doc(db, "games", gameId) as DocumentReference<Game>
  );
  ```
- This ensures proper type safety instead of generic `DocumentData`

### Component Patterns

- Use `Doc` helper component for single document fetching with automatic loading/error states
- Use `Collection` helper component for querying multiple documents
- Both components provide consistent error handling and loading states

### File-based Routing

- Dynamic routes use `[param].tsx` syntax (e.g., `[gameId].tsx`)
- Access route parameters with `useParams()` from `@solidjs/router`

### Firestore Security Rules

- Games collection uses player-based permissions:
  - Read: Allow all authenticated users
  - Create/Update/Delete: Only players in the game
