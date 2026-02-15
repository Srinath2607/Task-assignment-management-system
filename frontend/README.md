# TaskFlow - Task Management System (Frontend)

This is the frontend application for the Task Management System, built with React, Vite, and modern CSS.

## Features

- **Responsive Dashboard**: Beautiful, mobile-first design for both Managers and Members.
- **Kanban Board**: Interactive drag-and-drop interface using `@hello-pangea/dnd`.
- **Real-time Analytics**: Visual insights using `Recharts` (Donut and Bar charts).
- **Dark/Light Mode**: Premium theme system with persistent user preference.
- **Role-Based UI**: Dynamic interface that adapts based on user roles (Manager/Member).
- **Smooth Animations**: Micro-interactions, skeleton loaders, and fade-in effects for a premium feel.
- **Toast Notifications**: Interactive feedback using `React Toastify`.

## Tech Stack

- **React 18**: Modern UI library.
- **Vite**: Ultra-fast build tool and development server.
- **Vanilla CSS**: Custom-crafted professional styling.
- **Recharts**: Data visualization library.
- **Axios**: Promised-based HTTP client for API requests.
- **React Router**: Client-side routing.
- **@hello-pangea/dnd**: Drag-and-drop functionality for the Kanban board.

## Getting Started

### Prerequisites

- Node.js installed
- Backend server running (see [Backend Repo](https://github.com/Srinath2607/FSD18_Backend))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Srinath2607/FSD18_Frontend.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the root directory (optional, defaults to `5001`):

```env
VITE_API_URL=http://localhost:5001/api
```

### Running the App

- **Development Mode**:
  ```bash
  npm run dev
  ```
- **Production Build**:
  ```bash
  npm run build
  ```

## Project Structure

- `src/components`: Reusable UI components (Kanban, Charts, Analytics, etc.).
- `src/context`: Authentication and Theme state management.
- `src/pages`: Main application views (Dashboard, Login, Register).
- `src/services`: API interaction layer.
- `src/index.css`: Core design system and global styles.

## License

MIT
