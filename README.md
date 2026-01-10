# ⚡ Terminal Portfolio 

> A developer-centric portfolio designed for Backend Engineers. Featuring a terminal-inspired aesthetic, raw data visualizations, and a responsive system interface.

![Project Status](https://img.shields.io/badge/status-active-success)
![Tech Stack](https://img.shields.io/badge/stack-React_TS_Vite-blue)
![Style](https://img.shields.io/badge/style-Tailwind_v4-38bdf8)

## 📖 Overview

This portfolio serves as a "Digital Interface" to showcase backend architecture, technical skills, and complex projects. Unlike standard portfolios, it prioritizes data density and system aesthetics (Matrix rain, JSON views, terminal logs) over flashy UI transitions.

It is built with **Clean Architecture** principles in mind, separating data from presentation to allow for easy API integration in the future.

## ✨ Key Features

* **System-Like Interface:** "Matrix" data rain background using HTML Canvas.
* **Dual View Modes:** Toggle between **UI Mode** (Human readable) and **JSON Mode** (Raw data) for Skills and Projects.
* **Adaptive Theme:** Fully responsive Dark/Light mode with persistent state.
* **Data Visualization:** "Tech Cluster" and "Block Level" visualizers for skills (no arbitrary percentages).
* **Responsive Terminal:** Home screen adapts to mobile/desktop with balanced text wrapping.
* **Modal System:** Detailed project views with "Mission Logs" style modals.
* **Type-Safe:** Built completely in TypeScript with strict typing.

## 🛠️ Tech Stack

* **Core:** [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Using the new Oxide engine & CSS variables)
* **Icons:** [Material Icons](https://fonts.google.com/icons) + Custom SVG Components
* **Utilities:** `clsx` (Class composition), `react-syntax-highlighter` (JSON view)

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm or pnpm

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/BackendPhantom/portfolio.git
    cd portfolio
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Run the development server**

    ```bash
    npm run dev
    ```

4. **Build for production**

    ```bash
    npm run build
    ```

## ⚙️ Configuration & Customization

### 1. Updating Data

The project uses a structured data file to simulate a database. You do not need to touch the components to update your content.

* Navigate to: `src/data.ts`
* Update the `portfolioData` object:
  * **technicalSkills**: Your hard skills.
  * **softSkills**: Your soft skills.
    * **projects**: Array of project objects (title, desc, fullDesc, stack, etc.).

### 2. Customizing the Matrix Background

* Navigate to: `src/components/Background.tsx`
* Adjust `fontSize`, `speed`, or the character set (currently Binary + Hex) in the `draw` function.

### 3. API Integration (Future Proofing)

The app is architected to switch to a live API easily.

1. Check `src/services/api.ts`.
2. Set `VITE_API_URL` in your `.env` file.
3. The app will automatically switch from `data.ts` to your Django/FastAPI endpoint.

## 📂 Project Structure

```bash
src/
├── components/       # UI Components
│   ├── Background.tsx  # Matrix Rain Canvas
│   ├── Home.tsx        # Terminal Card
│   ├── Skills.tsx      # System Modules View
│   ├── Projects.tsx    # Project Grid & Modals
│   ├── Navbar.tsx      # Navigation & Mobile Menu
│   └── Icons.tsx       # Custom SVG Assets
├── services/         # API Service Layer
├── data.ts           # Static Data / Types
├── App.tsx           # Main Layout & Router Logic
└── index.css         # Tailwind v4 Configuration