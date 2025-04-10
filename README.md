# 📘 CourseGPT – AI-Powered Course Authoring Platform

**CourseGPT** is an elegant frontend web app that empowers educators and creators to build structured, interactive, and AI-generated courses in just a few clicks. With pixel-perfect designs and OpenAI integration, CourseGPT streamlines the way lessons, modules, and assessments are created.

> ✨ Built with **React + TailwindCSS + shadcn/ui + OpenAI** and bundled by **Bun + Vite** for blazing-fast development!

---

## ✨ Key Features

### 🎯 AI Lesson Generator
- Generate lesson titles, descriptions, outcomes, key concepts, activities, and assessments.
- One-click **regenerate** functionality for better results using OpenAI.
- Fully editable review interface.

### 📚 Module & Course Management
- Add, delete, and edit modules on the fly.
- View course dashboard with pixel-perfect UI.
- Organized module sections with intuitive trash and edit icons.

### 🎨 Pixel-Perfect UI
- Seamless, responsive transitions across:
  - **Dashboard**
  - **Create Course**
  - **Generate Lesson**
  - **Review & Edit**
  - **Success Page**
- Built to match Figma designs with near pixel-to-pixel accuracy.

### ⚙️ Tech Highlights
- 💨 Vite + Bun for speed
- 🎨 Tailwind CSS for rapid styling
- 🧩 shadcn/ui for accessible and beautiful UI components
- 🧠 OpenAI API integration for content generation

---

## 🗂 Project Structure (Simplified)

```
Course_GPT/
└── course-craft-gen-59/
    ├── index.html
    ├── package.json
    ├── tailwind.config.ts
    ├── vite.config.ts
    ├── tsconfig.json
    ├── components.json
    ├── src/
    │   ├── components/       # UI Components (Button, Cards, etc.)
    │   ├── pages/            # Page-level views (Dashboard, Editor, etc.)
    │   ├── lib/              # OpenAI API integration
    │   ├── styles/           # Tailwind and global CSS
    │   └── main.tsx          # Entry point
    └── public/               # Static assets (images, etc.)
```

---

## 🚀 Getting Started

### 📦 Prerequisites
- Node.js or Bun (recommended)
- OpenAI API Key

### 🧪 Installation

```bash
# If you use bun
bun install

# Or with npm
npm install
```

### 🔑 Add your OpenAI API key

Create a `.env` file in the root with the following:

```env
VITE_OPENAI_API_KEY=sk-...
```

> ⚠️ Note: This is a frontend-only project. Do **not** use sensitive API keys in production without a backend proxy.

### 🏃 Run Locally

```bash
bun run dev
# or
npm run dev
```

---

## 🖼️ App Screens Overview

- `Dashboard`: View all courses and modules
- `View Course`: See detailed structure
- `Generate Lesson`: Opens an AI-assisted generation form
- `Review Page`: Edit, regenerate, and finalize lesson content
- `Success Page`: Confirmation and redirection
- `Create Course`: Pixel-perfect form UI for new courses

---

## 🔧 Tools Used

| Tool           | Purpose                                |
|----------------|----------------------------------------|
| **React**      | Component-based frontend               |
| **TailwindCSS**| Rapid, utility-first styling           |
| **shadcn/ui**  | UI kit built on Radix + Tailwind       |
| **OpenAI API** | AI content generation                  |
| **Vite**       | Fast frontend build tool               |
| **Bun**        | JS runtime + package manager           |
| **Lucide Icons**| Icon library used with shadcn         |

---

## 🧠 Future Ideas

- Export lessons/modules as PDF or JSON
- Drag-and-drop module/lesson reordering
- Theme switcher (Dark/Light)
- Local draft save using `localStorage`

---
