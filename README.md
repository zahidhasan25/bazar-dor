# Bazar Dor — Daily Market Price Tracker

## Project Description

Bazar Dor is a responsive web application that helps users explore daily market prices of essential products in Bangladesh. Users can browse products by category, search for products, sort prices, view detailed market price information, and manage their accounts through secure authentication.

The application provides a simple and user-friendly experience across mobile phones, tablets, and desktop devices.

## Live Website

- **Live Website:** https://bazar-dor-bd-two.vercel.app
- **GitHub Repository:** https://github.com/zahidhasan25/bazar-dor

## Technologies Used

- **Next.js** — App Router and web application development
- **React** — User interface development
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Responsive styling
- **Better Auth** — Authentication and session management
- **PostgreSQL** — Relational database
- **Neon** — Hosted PostgreSQL database
- **Vercel** — Deployment and hosting
- **Git and GitHub** — Version control and source code management

## Key Features

1. **Responsive Navigation:** Provides organized navigation, category links, and a price ticker.
2. **Hero Section:** Introduces the application and provides quick access to product listings.
3. **Top Price Risers:** Displays products with increasing prices.
4. **Top Price Fallers:** Displays products with decreasing prices.
5. **Product Listing and Search:** Allows users to browse products and search for specific items.
6. **Category-Based Browsing:** Organizes products into categories such as rice, lentils, vegetables, fish, meat, and eggs.
7. **Price Sorting:** Supports sorting products from low to high and high to low.
8. **Protected Product Details:** Requires authentication before users can access detailed product information.
9. **Market Price Information:** Displays available price statistics and market-level information.
10. **User Authentication:** Supports email/password registration and login, Google OAuth, and GitHub OAuth.
11. **User Profile Management:** Allows authenticated users to view their profile and update their name.
12. **Loading and Error Handling:** Includes loading skeletons, user feedback notifications, error handling, and a custom 404 page.
13. **Responsive Design:** Supports mobile, tablet, and desktop screen sizes.
14. **Production Deployment:** Deployed on Vercel with production authentication configuration.

## Authentication

Bazar Dor uses Better Auth for authentication and session management.

Supported authentication features include:

- Email and password sign-up
- Email and password sign-in
- Google OAuth login
- GitHub OAuth login
- Protected routes
- Profile name updates
- Logout functionality
- Redirecting unauthenticated users to sign in before accessing protected product details

## Responsive Design

The application is designed to provide a consistent user experience across:

- Mobile phones
- Tablets
- Desktop computers
- Laptop screens

## Installation and Setup

### Prerequisites

Make sure the following are installed or available:

- Node.js
- npm
- Git
- A PostgreSQL database
- Google OAuth credentials for Google login
- GitHub OAuth credentials for GitHub login

### 1. Clone the Repository

```bash
git clone https://github.com/zahidhasan25/bazar-dor.git
```

### 2. Navigate to the Project Directory

```bash
cd bazar-dor
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root and add the following variables with your own credentials:

```env
DATABASE_URL=your_postgresql_connection_string
BETTER_AUTH_SECRET=your_secure_random_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

NEXT_PUBLIC_API_BASE_URL=https://api.api-store.workers.dev/api/bazardor
```

Replace the placeholder values with your actual credentials. Generate a secure random value for `BETTER_AUTH_SECRET`.

**Security:** Never commit `.env.local` or expose database credentials, authentication secrets, or OAuth client secrets in a public repository.

For production deployment, configure the required environment variables in Vercel and set `BETTER_AUTH_URL` to the production website URL. Configure the Google and GitHub OAuth callback URLs to match the production domain.

### 5. Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 6. Create a Production Build

```bash
npm run build
```

### 7. Run the Production Server Locally

After successfully creating the production build, run:

```bash
npm run start
```

## API Information

The application retrieves product and market data from the Bazar Dor API.

- **API Base URL:** https://api.api-store.workers.dev/api/bazardor

The base URL can be configured through the `NEXT_PUBLIC_API_BASE_URL` environment variable.

## Deployment

The application is deployed on Vercel and connected to the GitHub repository. When changes are pushed to the configured production branch, Vercel can automatically build and deploy the updated application.

**Production Website:** https://bazar-dor-bd-two.vercel.app

## Author

**Zahid Hasan**

- **GitHub:** https://github.com/zahidhasan25

## License

No license has been specified for this project.
