# ShipIntern 🚀

**Find Your Dream Internship in Global Software Engineering market.**

ShipIntern is a modern, real-time internship finder built for the global Software Engineering market. It aggregates live opportunities from across the web and boosts the search experience with AI-powered natural language processing.

![ShipIntern Banner](/images/banner.png)

## ✨ Key Features

- **🔴 Real-Time Feed**: Fetches live internship listings from LinkedIn, Indeed, Glassdoor, and more (via JSearch API).
- **🤖 AI-Powered Search**: Describe your ideal role in plain English (e.g., *"Remote React jobs paying > 20k posted this week"*), and our Gemini-powered agent translates it into precise search filters.
- **🎨 Modern & Vibrant UI**: A premium, glassmorphic design with smooth micro-animations, built with Tailwind CSS.
- **🌗 Dark/Light Mode**: Fully responsive theme switching.
- **🔍 Advanced Filtering**: Filter by Role, Location (Bangalore, Mumbai, Remote), Job Type, and Post Date.
- **📱 Fully Responsive**: Optimized for Desktop and Mobile viewing.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, `lucide-react` icons
- **Data Source**: [JSearch API](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch) (RapidAPI)
- **AI Integration**: [Google Gemini API](https://ai.google.dev/) (Generative AI)

## 🚀 Getting Started

### Prerequisites

1.  **Node.js** 18+ installed.
2.  **RapidAPI Key** (Subscribe to JSearch API - Free tier available).
3.  **Gemini API Key** (Get it from Google AI Studio).

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/ship-intern.git
    cd ship-intern
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    RAPIDAPI_KEY=your_rapidapi_key_here
    RAPIDAPI_HOST=jsearch.p.rapidapi.com
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📸 Screenshots

| Light Mode | Dark Mode |
|:---:|:---:|
| ![Light Mode](/images/light.png) | ![Dark Mode](/images/dark.png) |

## 🤝 Contributing

Contributions are welcome! Please fork the repo and submit a PR.

## 📄 License

MIT License.
