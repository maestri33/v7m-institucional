```markdown
# v7m-institucional Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill documents the core development patterns and conventions used in the `v7m-institucional` TypeScript codebase. It covers file naming, import/export styles, commit conventions, and testing patterns to ensure consistency and maintainability. Use this guide to onboard quickly or review best practices for contributing to this repository.

## Coding Conventions

### File Naming
- **Pattern:** PascalCase for all files.
- **Example:**  
  ```
  MyComponent.ts
  UserService.ts
  ```

### Import Style
- **Pattern:** Relative imports are used throughout the codebase.
- **Example:**
  ```typescript
  import MyComponent from './MyComponent';
  import { helperFunction } from '../utils/helperFunction';
  ```

### Export Style
- **Pattern:** Default exports are preferred.
- **Example:**
  ```typescript
  // MyComponent.ts
  export default function MyComponent() {
    // ...
  }
  ```

### Commit Messages
- **Pattern:** Conventional commits with the `fix` prefix.
- **Example:**  
  ```
  fix: correct typo in UserService
  ```

## Workflows

### Fixing a Bug
**Trigger:** When you identify and resolve a bug in the codebase.  
**Command:** `/fix-bug`

1. Create a new branch for your fix.
2. Make the necessary code changes.
3. Write or update tests as needed.
4. Commit your changes using the conventional commit format with the `fix` prefix.
   ```
   fix: resolve issue with login validation
   ```
5. Push your branch and open a pull request.

### Adding a New Feature
**Trigger:** When implementing a new feature or component.  
**Command:** `/add-feature`

1. Create a new branch for your feature.
2. Add new files using PascalCase naming.
3. Use relative imports and default exports.
4. Write or update tests as needed.
5. Commit your changes with a descriptive message.
   ```
   feat: add UserProfile component
   ```
6. Push your branch and open a pull request.

## Testing Patterns

- **Test File Pattern:** Test files use the `*.test.*` naming convention.
  - Example: `MyComponent.test.ts`
- **Testing Framework:** Not explicitly detected; use the existing test file patterns as a guide.
- **Best Practice:** Place test files alongside the files they test or in a dedicated `__tests__` directory if present.

## Commands
| Command        | Purpose                                 |
|----------------|-----------------------------------------|
| /fix-bug       | Start the bug fixing workflow           |
| /add-feature   | Start the feature addition workflow     |
```