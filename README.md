# Alexi Courieux's Resume

Welcome to the repository for Alexi Courieux's resume web application. This project is a modern, responsive resume/CV built using React and Material-UI for the frontend, and Axios for fetching data from an API.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Quality Checks](#quality-checks)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

## Features

- **Responsive Design**: The application is fully responsive and works on all devices.
- **Dark Mode**: Toggle between light and dark themes.
- **Multi-language Support**: Supports English and French languages.
- **Dynamic Data Fetching**: Fetches experiences and skills data from an API.
- **Interactive UI**: Clickable categories to filter skills, and modals to display detailed experience information.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A popular React UI framework.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **i18next**: An internationalization framework for JavaScript.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A fast build tool for modern web projects.

## Quality Checks
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=alexi-courieux_alexi-courieux-resume&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=alexi-courieux_alexi-courieux-resume)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=alexi-courieux_alexi-courieux-resume&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=alexi-courieux_alexi-courieux-resume)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=alexi-courieux_alexi-courieux-resume&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=alexi-courieux_alexi-courieux-resume)

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (version 7 or higher)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/alexi-courieux/alexi-courieux-resume.git
   cd alexi-courieux-resume
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Create a `.env.local` file in the root directory and add the following environment variables:
    ```plaintext
    VITE_API_URL=https://api.example.com # Replace with your API URL
    ```

### Running the Application

To start the development server, run:
```sh
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To build the application for production, run:
```sh
npm run build
```

To serve the production build locally, run:
```sh
npm run preview
```

## Project Structure
```plaintext
.
├── .github/workflows/          # GitHub Actions workflows
├── node_modules/               # Node.js modules
├── public/                     # Public assets
├── src/                        # Source code
│   ├── api/                    # API services and models
│   ├── assets/                 # Static assets like images and translations
│   ├── components/             # React components
│   ├── contextProviders/       # Context providers for theme, i18n, ...
│   ├── hooks/                  # Custom React hooks
│   ├── theme/                  # Theme configuration
│   ├── utils/                  # Utility functions (e.g. sorting)
│   ├── App.css                 # Global CSS
│   ├── App.tsx                 # Main App component
│   ├── index.css               # Global CSS
│   ├── main.tsx                # Entry point
│   └── vite-env.d.ts           # Vite environment types
├── scripts/                    # Shell/Bash scripts
├── .env.local                  # Local environment variables
├── .gitignore                  # Git ignore file
├── package.json                # NPM package configuration
├── tsconfig.json               # TypeScript configuration (shared)
├── tsconfig.app.json           # TypeScript configuration for the app
├── tsconfig.node.json          # TypeScript configuration for Node.js
├── vite.config.ts              # Vite configuration
├── openapi-ts.config.ts        # OpenAPI TypeScript configuration
├── generatorRuntimeConfig.ts   # OpenAPI TypeScript runtime configuration
├── eslint.config.js            # ESLint configuration
└── README.md                   # This file
```

## Generate API models
You can generate the API models and SDK from the openApi.json file using the following command:

_See [openapi-ts.config.js](./openapi-ts.config.ts) for configuration._
```sh
npm run openapi-ts
```
