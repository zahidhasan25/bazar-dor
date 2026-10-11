# বাজার দর (BazarDor)

## Project Description

BazarDor is a responsive web application that helps users explore daily market prices of essential products in Bangladesh. Users can browse products by category, search for products, sort prices, view detailed market price information, and manage their accounts through secure authentication.

The application is designed to provide a simple and user-friendly experience across mobile, tablet, and desktop devices.

## Live Website

- **Live Link:** https://bazar-dor-bd-two.vercel.app
- **GitHub Repository:** https://github.com/zahidhasan25/bazar-dor

## Technologies Used

- **Next.js** — App Router and server-rendered pages
- **React** — User interface development
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Responsive styling
- **Better Auth** — Authentication and session management
- **PostgreSQL** — Database
- **Neon** — Hosted PostgreSQL database
- **Vercel** — Deployment
- **Git & GitHub** — Version control and source code hosting

## Key Features

1. **Responsive Navigation and Hero Section** — Provides an organized navigation system, price ticker, and hero section for quick access to market information.
2. **Top Price Risers and Fallers** — Displays products with increasing and decreasing prices to help users understand price movements.
3. **Product Listing and Search** — Allows users to browse all products and find specific items using search.
4. **Category-Based Browsing** — Organizes products into categories such as rice, lentils, vegetables, fish, meat, and eggs.
5. **Price Sorting** — Enables users to sort products by price from low to high or high to low.
6. **Protected Product Details** — Requires authentication before users can access product details and market price information.
7. **User Authentication** — Supports email/password registration and login, Google login, and GitHub login.
8. **User Profile Management** — Allows authenticated users to view their profile and update their name.
9. **User Feedback and Error Handling** — Includes toast notifications, loading skeletons, error handling, and a custom 404 page.
10. **Production Deployment** — Deployed on Vercel with production authentication configuration.

## Authentication

BazarDor uses Better Auth for user authentication and session management.

Supported features include:

- Email and password sign-up and sign-in
- Google OAuth login
- GitHub OAuth login
- Protected routes
- Profile name updates
- Logout functionality
- Redirecting unauthenticated users to sign in before accessing protected product details

## Responsive Design

The interface is designed to work across:

- Mobile phones
- Tablets
- Desktop and laptop screens

## Installation and Setup

### Prerequisites

- Node.js
- npm
- Git
- A PostgreSQL database
- Google and GitHub OAuth credentials for social login

### 1. Clone the Repository

```bash
git clone https://github.com/zahidhasan25/bazar-dor.git
```

### 2. Navigate to the Project

```bash
cd bazar-dor
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root and add your own credentials:

```env
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXT_PUBLIC_API_BASE_URL=https://api.api-store.workers.dev/api/bazardor
```

For production, configure the appropriate environment variables in Vercel and set `BETTER_AUTH_URL` to the deployed website URL. Configure OAuth callback URLs for the production domain as well.

**Security:** Never commit `.env.local` or expose database credentials, authentication secrets, or OAuth client secrets.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Create a Production Build

```bash
npm run build
```

## Deployment

The project is deployed on Vercel and connected to the GitHub repository. When changes are pushed to the configured production branch, Vercel can automatically build and deploy the updated application.

## Author

**Zahid Hasan**

- GitHub: https://github.com/zahidhasan25

## License

No license has been specified for this project.
