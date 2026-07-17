# Talkiepedia 2.0

Talkiepedia is a premium interactive learning platform designed to bridge the gap between aspiring students, professionals, and industry leaders. It offers visual video podcasts, audio streaming, and a context-aware AI study assistant to help users accelerate their career readiness and professional growth.

## 🔗 Live Deployment Link
> [!IMPORTANT]
> **Click here to view the live website: [https://talkipedia.netlify.app](https://talkipedia.netlify.app/)**

---

## 🌟 Key Features

* **Premium UI/UX:** Fully responsive, fluid grids, styled with a modern, high-end design aesthetic (similar to Stripe and Apple) using Custom CSS variables.
* **Interactive Study Lamp Switcher:** A signature, hanging study lamp in the navbar with string-pull physics and natural swing animations for toggling light and dark themes.
* **Context-Aware AI Knowledge Assistant:** An interactive sidebar companion that reads page context to generate:
  * **Summarizations:** Quick page highlights.
  * **ELI5 Mode:** Concept explanations simplified for a 5-year-old.
  * **Interactive Quizzes:** Practice tests with instant correct/incorrect feedback.
  * **Interactive Flashcards:** 3D flip card boxes with click triggers.
  * **Roadmaps:** Custom study learning paths.
* **Accessibility (WCAG Compliant):** Built-in tools for font scaling, high-contrast mode, and keyboard navigation.
* **Global Audio Player:** A persistent audio media player located at the bottom of the page for continuous streaming of podcast episodes.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 19 (SPA Router setup)
* **Build tool:** Vite
* **Styles:** Vanilla CSS with custom tokens & theme definitions
* **Iconography:** Lucide React
* **Popups:** SweetAlert2

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js (version 18+ recommended) installed on your system.

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/ozrehan/talkiepedia.git
cd talkiepedia
npm install
```

### 3. Run Locally
Start the development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build Production Bundle
To create a production build in the `dist/` directory:
```bash
npm run build
```
