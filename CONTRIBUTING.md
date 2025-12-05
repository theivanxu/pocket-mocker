# Contributing to PocketMocker

First off, thank you for considering contributing to PocketMocker! It's people like you that make PocketMocker such a great tool.

## Development Setup

1. **Fork and Clone** the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pocket-mocker.git
   cd pocket-mocker
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   This will start the Vite development server with a demo page where you can test your changes.

## Project Structure

The project codebase is organized as follows:

```
src/
├── core/                 # Core Logic (The Brain)
│   ├── adapters/         # Interceptors for fetch/XHR
│   ├── engine/           # Request matching, handling, and smart mock generation
│   ├── manager/          # Rule state management
│   ├── importers/        # Logic for importing Postman/OpenAPI configs
│   └── utils/            # Shared utilities
├── lib/                  # UI Components (Svelte)
│   ├── components/       # Domain-specific components
│   │   ├── layout/       # Header, Tabs, Container
│   │   ├── rules/        # Rule list, editor, filters
│   │   └── network/      # Network log panel
│   ├── stores/           # UI state management (dashboard-store)
│   └── ui/               # Reusable base components (Button, Input, etc.)
├── store/                # Global Business State (Rules, Logs)
├── plugin/               # Vite Plugin source code
└── test/                 # Unit and Integration Tests
```

## Testing

We use **Vitest** for testing. Please ensure all tests pass before submitting your PR.

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch
```

If you add new features, please add corresponding test cases in the `test/` directory.

## Commit Guidelines

We follow the **Conventional Commits** specification.

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

**Example:** `feat(core): add support for graphQL mocking`

## Pull Request Process

1. Create a new branch from `main`: `git checkout -b feat/my-new-feature`.
2. Make your changes and commit them following the guidelines above.
3. Run tests to ensure no regressions: `npm run test`.
4. Push your branch: `git push origin feat/my-new-feature`.
5. Open a Pull Request on GitHub.
6. Provide a clear description of your changes and link any relevant issues.

Thank you for your contribution!
