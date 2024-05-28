import { promises as fs } from "fs";
import { NextResponse } from "next/server";

function removeKeys(obj, keysToRemove) {
  const newObj = { ...obj };
  keysToRemove.forEach((key) => delete newObj[key]);
  return newObj;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceStatus = searchParams.get("deviceStatus");
    const downloadStatus = searchParams.get("downloadStatus");
    const searchQuery = searchParams.get("q");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const file = await fs.readFile(process.cwd() + "/db.json", "utf8");
    const data = JSON.parse(file);

    const keysToRemove = [
      "planStartDate",
      "billingCycle",
      "ispPaymentResponsibility",
      "storage",
    ];

    let appliances = data?.appliances || [];

    // Apply filters if query parameters are present
    if (deviceStatus) {
      appliances = appliances.filter(
        (appliance) =>
          appliance.deviceStatus.toLowerCase() === deviceStatus.toLowerCase()
      );
    }

    if (downloadStatus) {
      appliances = appliances.filter(
        (appliance) =>
          appliance.downloadStatus.toLowerCase() ===
          downloadStatus.toLowerCase()
      );
    }

    // Apply search query if present
    if (searchQuery) {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      appliances = appliances.filter((appliance) =>
        appliance.serialNo.toLowerCase().includes(lowerCaseSearchQuery)
      );
    }

    // Pagination logic
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedAppliances = appliances.slice(startIndex, endIndex);

    const newData = paginatedAppliances.map((appliance) =>
      removeKeys(appliance, keysToRemove)
    );

    return NextResponse.json(
      {
        success: true,
        appliances: newData,
        page,
        limit,
        total: appliances.length,
        totalPages: Math.ceil(appliances.length / limit),
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error: " + error);
    return NextResponse.json(
      {
        httpStatus: 500,
        httpCode: "INTERNAL_SERVER_ERROR",
        success: false,
        errors: [
          {
            code: 500,
            message: "Internal Server Error",
          },
        ],
      },
      { status: 500 }
    );
  }
}
