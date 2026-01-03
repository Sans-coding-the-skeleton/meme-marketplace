# Meme Marketplace Pro 🚀

**Meme Marketplace Pro** is a comprehensive React application developed as a final project. It simulates a digital marketplace where users can browse, search, view, and "purchase" memes. The application demonstrates modern React patterns including fully responsive design, custom hooks, global state management via Context API, and secure client-side routing.

## ✨ Features

- **Authentication System**:
  - Secure login simulation (validates username length > 3, password length > 5).
  - Protected routes (`/dashboard`, `/memes`, `/cart`) accessible only after login.
  - Session persistence using `localStorage`.

- **Dashboard**:
  - Real-time statistics (total memes, categories, cart value).
  - "Meme of the Day" highlighting the highest-rated content.

- **Meme Browsing & Discovery**:
  - **Dynamic Grid**: Fetches popular memes from the Imgflip API.
  - **Smart Filtering**: Filter by categories (Animals, Gaming, Celebrities, etc.).
  - **Search**: Instant search by meme name.
  - **Sorting**: Order by Name, Rating, or Image Size.
  - **Skeleton Loading**: Smooth loading states for better UX.

- **Detailed Views**:
  - High-resolution meme display.
  - Randomized stats generation (Price, Rating, Category) to simulate a marketplace.
  - **Related Memes**: Context-aware suggestions based on categories.

- **Shopping Cart**:
  - Global cart state powered by `Context API`.
  - Add/Remove items, adjust quantities.
  - Real-time total price calculation.

- **UI & UX**:
  - **Dark/Light Mode**: Fully themable interface with persistence.
  - **Responsive Design**: Mobile-first approach using Tailwind CSS.
  - **Animations**: Subtle transitions and hover effects.

## 🛠️ Tech Stack

- **Core**: React 19, Vite
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v3, Lucide React (Icons)
- **State Management**: React Context API
- **Data Fetching**: Native Fetch API with Custom Hooks
- **Persistence**: LocalStorage

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation

1. **Clone the repository** (or navigate to the project folder):
   ```bash
   cd meme-marketplace
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The app will typically run at `http://localhost:5173`.

### Building for Production

To create an optimized build for deployment:
```bash
npm run build
```
The output will be in the `dist` folder.

## 📂 Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable UI components (Layout, MemeCard, etc.)
├── context/         # Global state providers (Auth, Cart)
├── hooks/           # Custom hooks (useFetch, useCart, useLocalStorage)
├── pages/           # Page views (Dashboard, Login, Memes, Cart)
├── services/        # API integration logic
├── App.jsx          # Root component with Routing logic
└── main.jsx         # Entry point
```

## 🔗 APIs Used

*   **Imgflip API**: Used to fetch the list of popular memes. (`https://api.imgflip.com/get_memes`)
    *   *Note: Since the API provides limited metadata, we simulate Prices, Ratings, and Categories on the client side for demonstration purposes.*

## 📝 License

This project is for educational purposes.
