# Real Estate Platform

This is a comprehensive real estate platform for buying, selling, and renting properties, built with Next.js and Firebase.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Database:** [Firebase Firestore](https://firebase.google.com/docs/firestore)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **i18n:** [react-i18next](https://react.i18next.com/)

## Project Structure

The project uses the Next.js App Router, which enables a clear separation between server and client components.

*   `app/`: Contains all the routes and pages.
    *   `layout.tsx`: The root layout of the application. It's a Server Component that wraps all pages.
    *   `providers.tsx`: A Client Component (`'use client'`) that holds all client-side context providers (e.g., Auth, i18n).
    *   `page.tsx`: The main page, which is a Server Component responsible for fetching data from the database.
    *   `components/`: Contains reusable React components.
        *   `PropertyList.tsx`: A Client Component that receives data as props and handles UI rendering and user interactions.
    *   `terms/`: Contains legal pages like the Privacy Policy and Paid Services Terms.
*   `lib/firebase/`: Configuration files for the Firebase SDK.
    *   `client.ts`: Firebase client configuration for browser-side usage.
    *   `server.ts`: Firebase Admin SDK configuration for server-side usage (e.g., in Server Components, API routes).
*   `scripts/`: Contains utility scripts for the project.
    *   `seed.ts`: A script to populate the Firestore database with initial mock data.

## Getting Started

Follow these steps to get the development environment up and running.

### 1. Installation

Install the necessary dependencies using npm:

```bash
npm install
```

### 2. Environment Variables

This project uses Firebase for its backend. You will need to set up a Firebase project and obtain your service account credentials.

1.  Create a `.env.local` file in the root of the project.
2.  Add your Firebase service account credentials to the file. It should be a base64-encoded JSON string.

```
FIREBASE_SERVICE_ACCOUNT_BASE64=<YOUR_BASE64_ENCODED_SERVICE_ACCOUNT_KEY>
```

### 3. Seed the Database

To populate the database with some initial sample data, run the seed script:

```bash
npm run db:seed
```

This will add a few sample properties to your Firestore `properties` collection.

### 4. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Features

*   View a list of the latest available properties.
*   Switch between English and Korean languages.
*   User authentication (setup via Firebase Auth).
*   Terms and Privacy pages available at `/terms/paid` and `/terms/privacy`.
