# Device Management System

## Getting Started

1. Clone the repository and navigate into the project directory:

   ```bash
   git clone git@github.com:jeevanantham123/react-dms.git
   cd react-dms
   ```

2. Copy `.env.sample` to `.env.local`:

   ```bash
   cp .env.sample .env.local
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Mock Data

The `db.json` file at the root of the project contains mock data for development purposes. This file is used to simulate interactions with a backend database during local development and in the production environment.

## Deployment

This project is deployed on [Vercel](https://vercel.com/) and can be accessed at [https://react-dms-eight.vercel.app/](https://react-dms-eight.vercel.app/). The production environment also uses the `db.json` file for data.
