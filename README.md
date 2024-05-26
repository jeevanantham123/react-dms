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

## API Routes

### GET /api/v2/appliances

This route fetches all devices from the mock data.

#### Request:

No request parameters required.

#### Response:

- Status Code: 200 OK
- Response Body:

```json
{
  "appliances": [
    {
      "serialNo": "JTD-512312",
      "theatreName": "Kriplle Square",
      "location": {
        "city": "New Delhi",
        "state": "Delhi",
        "country": "India"
      },
      "bandwidth": "1 Gbps",
      "avgBandwidth": "812 Kbps",
      "deviceStatus": "Offline",
      "downloadStatus": "Failed",
      "osVersion": "5.2.1.3"
    }
  ]
}
```

### GET /api/v2/appliance/{appliance-id}/info

This route a fetches device data which matches appliance-id with their serial number.

#### Request

- appliance-id query param required

#### Response:

- Status Code: 200 OK
- Response Body:

```json
{
  "serialNo": "JTD-512312",
  "theatreName": "Kriplle Square",
  "location": {
    "city": "New Delhi",
    "state": "Delhi",
    "country": "India"
  },
  "ispPaymentResponsibility": "Qube",
  "bandwidth": "1 Gbps",
  "avgBandwidth": "812 Kbps",
  "planStartDate": "2023-10-01T10:00:00Z",
  "billingCycle": "Monthly",
  "deviceStatus": "Offline",
  "downloadStatus": "Failed",
  "osVersion": "5.2.1.3",
  "storage": "828 GB"
}
```

## Deployment

This project is deployed on [Vercel](https://vercel.com/) and can be accessed at [https://react-dms-eight.vercel.app/](https://react-dms-eight.vercel.app/). The production environment also uses the `db.json` file for data.
