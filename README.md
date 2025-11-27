# 🛠️ PocketMock

> **Visual in-browser HTTP mocking tool for modern frontend development.**
>
> A lightweight, visual debugging tool that intercepts and modifies HTTP requests directly in your browser.

[![npm version](https://badge.fury.io/js/pocket-mock.svg)](https://badge.fury.io/js/pocket-mock)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
**English** | [中文](README.zh-CN.md)

**PocketMock** is a zero-intrusion frontend Mock tool. Unlike Postman or traditional `mock.js`, it embeds directly **into your page**, allowing you to intercept `fetch` and `XMLHttpRequest` in real-time during development, dynamically modify response data, simulate network latency, and test error status codes.

*(Demo GIF here - showing the floating panel, JSON editing, and rule testing)*

## ✨ Features

- **⚡ Dual-Core Interception Engine**: Native support for both `fetch` and `XMLHttpRequest` (Ajax), seamlessly compatible with Axios and other third-party libraries
- **🎨 Visual Console**: Built-in Svelte debugging panel with **CodeMirror 6** editor (JS syntax highlighting), toggle switches, and real-time preview
- **🧠 Dynamic Response**: Support writing JavaScript functions to handle complex logic and return dynamic data based on request parameters
- **✨ Smart UI**: Auto-adaptive **Light/Dark Theme**, elegant **Toast** notifications, and responsive layout
- **🛡️ Shadow DOM Isolation**: UI styles are completely isolated, never polluting your application's CSS or being affected by external styles
- **🐢 Network Simulation**: One-click simulation of API **latency**, **404/500 errors**, perfect for testing skeleton screens and error boundaries
- **📂 Dual-Mode Persistence**:
  - **Local Mode**: Default browser LocalStorage storage, rules persist across page refreshes
  - **Server Mode**: Vite plugin integration saves rules to local files for **team collaboration**

## 📦 Installation

```bash
npm install pocket-mock --save-dev
# or
yarn add pocket-mock -D
# or
pnpm add pocket-mock -D
```

## 🚀 Quick Start

### Method 1: Zero Configuration (Local Mode)

Perfect for individual development or quick experimentation. Simply import and start in your project's entry file:

```javascript
import { start } from 'pocket-mock';

// Only start in development environment
if (process.env.NODE_ENV === 'development') {
  start();
}
```

After starting your project, you'll see the **PocketMock** floating panel in the bottom-right corner.

### Method 2: Team Collaboration Mode (Vite Plugin) 🔥 Recommended

Ideal for production-level projects. The Vite plugin integrates with the file system, saving Mock rules to config files for team sharing.

**1. Configure `vite.config.ts`**

```typescript
import { defineConfig } from 'vite';
import pocketMockPlugin from 'pocket-mock/vite-plugin';

export default defineConfig({
  plugins: [
    pocketMockPlugin()
  ]
});
```

**2. Start Development**

Run `npm run dev`. PocketMock automatically detects the plugin environment and switches to **Server Mode**.

## 🛠️ Advanced Features

### Dynamic Response (Function Mock)

You are not limited to static JSON. You can write JavaScript functions to generate responses dynamically based on the request!

```javascript
// In the Dashboard editor or config file:
(req) => {
  // Access query parameters (e.g. /api/user?id=1)
  if (req.query.id === '1') {
    return { id: 1, name: 'Admin User', role: 'admin' };
  }
  
  // Access JSON body
  if (req.body && req.body.type === 'guest') {
    return { id: 2, name: 'Guest', role: 'guest' };
  }

  // Return custom status and headers
  return {
    status: 404,
    headers: { 'X-Error': 'User not found' },
    body: { error: 'User not found' }
  };
}
```

### Rule Configuration

Each Mock rule supports the following fields:

```typescript
interface MockRule {
  id: string;
  method: string;       // GET, POST, PUT, DELETE...
  url: string;          // URL pattern (supports /api/users/:id)
  response: any | ((req) => any); // Static data OR Function
  enabled: boolean;
  delay: number;        // Latency in ms
  status: number;       // HTTP Status (200, 400, 500...)
  headers: Record<string, string>;
}
```

### Network Log Panel

Built-in Network panel displays intercepted requests in real-time:

- **Request URL and Method**
- **Response Status Code**
- **Request Duration**
- **Mock vs Real Request Indicator**

### Smart Fallback Strategy

PocketMock uses a progressive architecture:

1. **Startup**: Attempts to connect to development server API
2. **Server Mode**: If successful, enables file read/write operations
3. **Local Mode**: If connection fails (no plugin or non-Vite environment), automatically falls back to LocalStorage storage

This ensures compatibility with Webpack, RSPack, or even pure HTML projects.

## 💡 Technical Architecture

- **Monkey Patching**: Intercepts requests by overriding `window.fetch` and extending `XMLHttpRequest` prototype chain
- **Shadow DOM**: Encapsulates debugging UI in Shadow Root for complete style sandboxing
- **Vite Library Mode**: Uses Vite's library mode with `css: 'injected'` strategy to inline all CSS into JS for **single-file import** experience

## 🎯 Use Cases

- **API Development**: Mock backend responses before API completion
- **Error Testing**: Simulate network failures, timeouts, and server errors
- **Performance Testing**: Test loading states and skeleton screens with artificial delays
- **Offline Development**: Work without backend dependencies
- **Team Collaboration**: Share Mock configurations across development teams

## 🔧 Advanced Configuration

### Custom Integration

```javascript
import { start } from 'pocket-mock';

start({
  enable: true // Optional explicit enable flag
});
```

### TypeScript Support

Full TypeScript support included:

```typescript
import { start, MockRule } from 'pocket-mock';

// Types are automatically available
const rule: MockRule = {
  id: 'custom-rule',
  method: 'GET',
  url: '/api/users',
  response: { users: [] },
  enabled: true,
  delay: 1000,
  status: 200,
  headers: { 'X-Custom': 'value' }
};
```

## 🤝 Contributing

Local development setup:

```bash
git clone https://github.com/your-username/pocket-mock.git
cd pocket-mock
npm install

# Start development server
npm run dev

# Build distribution package
npm run build

# Run tests
npm test
```

## 📄 License

MIT © [Your Name](https://github.com/your-username)

## 🙏 Acknowledgments

- Built with [Svelte](https://svelte.dev/) for the reactive UI
- Powered by [Vite](https://vitejs.dev/) for fast development and building
- Inspired by modern web development needs for better debugging tools

---

**Happy Mocking! 🚀**