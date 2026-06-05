[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<div align="center">
  <h1>AI Chatbot Tree</h1>
  <p>
    Tree-based chat UI that keeps the Conversation Tree (SSOT) as the single source of truth,
    synchronizes with
    <code>@ai-sdk/react</code> v6, and visualizes branching paths with D3.js/React Flow.
  </p>
  <p>
    <a href="#about-the-project">About</a> ·
    <a href="#getting-started">Getting Started</a> ·
    <a href="#architecture">Architecture</a> ·
    <a href="#contributing">Contributing</a> ·
    <a href="#license">License</a>
  </p>
</div>

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Built With](#built-with)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About The Project

AI Chatbot Tree stores every message in a **Conversation Tree (SSOT)** and keeps the
SDK view in sync by projecting the **Projection Recipe** (projection root + ordered
sequence) into **Projected Messages** (`UIMessage[]`) before sending it to `useChat`.
When the stream resolves, the hook commits the final user/assistant nodes back into
the tree so you can branch, regenerate, or inspect historic context through Tree
Navigator (D3) or Canvas (React Flow).

The Conversation Tree (nodes + parent/child links) is the single source of truth,
while the chat UI only renders the Projection Recipe. Tree persistence uses `lz-string`
compression with a checksum so the history survives reloads without storing UI-only
state like zoom or locks.

## Features

- Conversation Tree SSOT + `_pathCache` for fast ancestor traversal.
- Projection Recipe (root + sequence) that explicitly defines SDK context, with
  reorder/remove controls and cross-branch composition.
- `useTreeChat` projector/orchestration that unlocks the tree when streaming finishes,
  creates placeholders for user/assistant nodes, and exposes `sendIsolated`,
  `regenerate`, and `addManualMessage`.
- Context engineering panel for export/import/reset, projection preview,
  and statistics (recipe count, ratio, preview snippet).
- D3-based Tree Navigator and XYFlow Canvas visuals to explore the whole tree and
  highlight the Projection Recipe with virtual edges for non-parent adjacency.
- Manual message dialog with isolated root toggle, branch selector inside
  chat messages, and retry/copy helpers.
- Local API route `/api/chat` that forwards Projected Messages (`UIMessage[]`) through `streamText`
  while honoring a configured `responseId`.

## Built With

- [Next.js 16 (App Router)](https://nextjs.org)
- [AI SDK v6 (`ai`, `@ai-sdk/react`)](https://ai-sdk.dev)
- [Zustand](https://github.com/pmndrs/zustand)
- [D3](https://d3js.org/)
- [React Flow](https://reactflow.dev)
- [Shadcn UI (Radix)](https://ui.shadcn.com)
- [AI Elements](https://ai-sdk.dev/elements)
- [Tailwind CSS v4](https://tailwindcss.com/)

## Architecture

- **Conversation Tree** (`src/stores/tree-store.ts`): nodes map, projection recipe state,
  canvas state, parts, lock flag, persistence adapter, `_pathCache`, and
  helper actions (`addMessage`, `updateMessage`, `renameNode`, `deleteNode`).
- **Hook** (`src/hooks/use-tree-chat.ts`): projector between the Conversation Tree
  (Projection Recipe) and `useChat`, placeholder management, signature diffing,
  `onFinish` commit, branching helpers, and manual message flow.
- **Projection** (`src/lib/tree-projection.ts`): builds TopicTree nodes/edges for the
  Tree Navigator, including virtual edges for recipe adjacency.
- **Visuals**: `ChatHeader`, `ChatMessages`, `TreeNavigator`, `CanvasView`, and `WorkflowNode`.
- **API**: `/api/chat` converts Projected Messages (`UIMessage[]`) ⇒ model messages ⇒ `streamText`.
- **Docs**: `docs/message-tree.md` explains the current data flow and expansion ideas.

## Getting Started

### Prerequisites

- Node.js 20+
- npm (bundled with Node.js)
- `AI_GATEWAY_API_KEY` (copy `env.example` to `.env.local`). To get a Vercel AI gateway API key, sign up
  at [https://vercel.com/ai-gateway](https://vercel.com/ai-gateway) and create a new key in the dashboard. Or you can use other compatible providers.

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/TongDucThanhNam/storytelling
   cd storytelling
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` and add your API key:
   ```bash
   cp env.example .env.local
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```

## Usage

- Open the UI in your browser (default port 3000).
- Type a prompt in the chat input; toggle the isolated switch to spawn a new root,
  or hit "Add Message" to place manual content anywhere.
- Use the Canvas to right-click a node and set the projection root, then drag
  connections to append or insert nodes into the Projection Recipe.
- Use the Canvas Projection Recipe panel to reorder or remove steps, and the
  Context Panel to preview or export/import/reset the tree.
- Regenerate the last assistant node to branch from the previous user message,
  and use the branch selector in the chat to switch between siblings.

Refer to `docs/message-tree.md` for a deeper dive into the projection logic, hook
workflows, unlock strategy, and persistence invariants.

## Roadmap

- [x] Tree-driven chat with placeholder nodes
- [x] Context panel with import/export/reset
- [x] Branch selector + regenerate support
- [x] Canvas view with XYFlow
- [ ] Partial-streaming assistant node (draft status)
- [ ] Database persistence
- [ ] Rich multimodal rendering inside `ChatMessages`

## Contributing

1. Fork the repo.
2. Create a feature branch.
3. Run the formatter/linter (Biome).
4. Submit a PR describing your changes.

Please open issues for bugs or feature requests, especially if they touch the tree synchronization logic.

## License

MIT © AI Chatbot Tree

## Contact

- Maintainer: Terasumi · [LinkedIn](https://www.linkedin.com/in/tong-duc-thanh-nam) · Tong Duc Thanh Nam
- Documentation reference: `docs/message-tree.md`

[contributors-shield]: https://img.shields.io/github/contributors/TongDucThanhNam/storytelling?style=for-the-badge
[contributors-url]: https://github.com/TongDucThanhNam/storytelling/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/TongDucThanhNam/storytelling?style=for-the-badge
[forks-url]: https://github.com/TongDucThanhNam/storytelling/network/members
[stars-shield]: https://img.shields.io/github/stars/TongDucThanhNam/storytelling?style=for-the-badge
[stars-url]: https://github.com/TongDucThanhNam/storytelling/stargazers
[issues-shield]: https://img.shields.io/github/issues/TongDucThanhNam/storytelling?style=for-the-badge
[issues-url]: https://github.com/TongDucThanhNam/storytelling/issues
[license-shield]: https://img.shields.io/github/license/TongDucThanhNam/storytelling?style=for-the-badge
[license-url]: https://github.com/TongDucThanhNam/storytelling/blob/main/LICENSE
