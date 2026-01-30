# Copilot / AI Agent Instructions

Purpose: quick, actionable guidance to help an AI coding agent be productive in this repository.

Big picture

- This is an Expo (React Native + web) app using Expo Router and TypeScript. See [package.json](package.json) and [app.json](app.json).
- File-system routing lives under [src/app](src/app). Root layout and app-level providers are in [src/app/\_layout.tsx](src/app/_layout.tsx).
- UI uses Tailwind via NativeWind; styles are applied as className strings on React Native components (see [src/styles/global.css](src/styles/global.css)).
- Project uses component + hooks + guards organization under [src/components](src/components), [src/hooks](src/hooks), and [src/guards](src/guards).
- Path alias `@/` maps to `./src/*` (see [tsconfig.json](tsconfig.json)). Use `@/` imports in generated code.

Key integrations & runtime setup

- Expo Router: entry is `expo-router/entry` (package.json `main`). Use typed routes (enabled in app.json experiments).
- Bottom sheets: uses `@gorhom/bottom-sheet` with a local `useBottomSheets` provider ([src/hooks/useBottomSheets.tsx]). Wrap UI with `BottomSheetProvider` as in [src/app/\_layout.tsx](src/app/_layout.tsx).
- Gesture & Reanimated: app imports `react-native-reanimated` and uses `GestureHandlerRootView` in the root layout. Keep these when moving screens/components.
- Fonts: loaded/guarded by `FontGuard` in [src/guards/font-guard.tsx]—ensure fonts are available in `assets/fonts` when touching typography.
- NativeWind/Tailwind: tailwind classes appear in JSX (e.g., `className="flex-1 items-center bg-white"`). Prefer reusing existing components that already apply classes.

Developer workflows (commands)

- Start Metro / Expo dev server (web + device): `npm run start` or `expo start`.
- Run on Android device/emulator: `npm run android` or `expo run:android`.
- Run on iOS (macOS): `npm run ios` or `expo run:ios`.
- Run web: `npm run web`.
- Formatting / lint: this repo includes `@biomejs/biome` as a devDependency—use `npx biome check` / `npx biome format` if configured in CI or local scripts.

Project-specific conventions

- Routes: follow the Expo Router filesystem pattern under [src/app](src/app). Example: the home stack is defined by files in [src/app].
- Imports: always prefer the `@/` alias for internal `src` imports (e.g., `import { Input } from '@/components/form/input'`).
- Components: small, presentational components live in `src/components`; feature screens live under `src/app/*` folders.
- Styling: use existing `Typography`, `Button`, `Input` components instead of duplicating styles. Tailwind classes are the primary styling mechanism.
- State & side-effects: local state per-screen; there is no global state manager in the repo—introduce one only if necessary and document it.

Files to inspect for patterns/examples

- App shell & routing: [src/app/\_layout.tsx](../src/app/_layout.tsx)
- Example screen: [src/app/(home)/index.tsx](<../src/app/(home)/index.tsx>)
- Bottom sheet hook: [src/hooks/useBottomSheets.tsx](../src/hooks/useBottomSheets.tsx)
- Guards: [src/guards/font-guard.tsx](../src/guards/font-guard.tsx)
- Form components: [src/components/form/input.tsx](../src/components/form/input.tsx) and [src/components/form/radio.tsx](../src/components/form/radio.tsx)
  When changing code

- Keep `GestureHandlerRootView` and `react-native-reanimated` imports in root layout to avoid runtime issues.
- Preserve `@/` imports and update `tsconfig.json` paths if adding new base aliases.
- When adding native modules or upgrading Reanimated/Gesture libraries, follow their install guides and rebuild native projects (`expo run:android`) if necessary.
