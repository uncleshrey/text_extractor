# Text Extractor App

A modern, high-performance web application that extracts text from images instantly using Optical Character Recognition (OCR). Built with **React** and **Tesseract.js**, running entirely in the browser.

## 🚀 Tech Stack

-   **Framework**: [React](https://react.dev/) (via [Vite](https://vitejs.dev/))
-   **OCR Engine**: [Tesseract.js](https://tesseract.projectnaptha.com/) (WASM-based)
-   **Styling**: Vanilla CSS with Glassmorphism design system
-   **State Management**: React Hooks (`useState`, `useEffect`)

## ✨ Features

-   **Client-Side OCR**: Extracts text locally without sending images to a server, ensuring privacy and speed.
-   **Drag & Drop Upload**: Intuitive file handling supporting JPG, PNG, and BMP formats.
-   **Real-time Progress**: Visual feedback with a loading spinner and progress percentage during extraction.
-   **Smart Reset**: "Reset" button allows users to quickly process multiple images without refreshing.
-   **Clipboard Integration**: One-click "Copy" button to save extracted text.
-   **Responsive Design**: Fully responsive layout that works on desktop and mobile devices.

## 🛠️ Architecture

The application follows a simple component-based architecture:

-   **`App.jsx`**: The core container managing application state (`image`, `text`, `isLoading`, `progress`).
    -   Handles file input events (drop, click).
    -   Initializes Tesseract worker for text recognition.
    -   Manages UI state transitions (Upload -> Processing -> Result).
-   **`index.css`**: Contains the global design system, variables for theming (colors, glass effects), and component styles.

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/uncleshrey/text_extractor.git
    cd text_extractor
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 🚀 Deployment

This project is optimized for static hosting.

-   **Vercel/Netlify**: Simply connect your GitHub repo or drag-and-drop the `dist` folder after building.
-   **GitHub Pages**: Configure `base` in `vite.config.js` and deploy the `dist` folder.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.
