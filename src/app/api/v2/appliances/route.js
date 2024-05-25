import { promises as fs } from "fs";
import { NextResponse } from "next/server";

function removeKeys(obj, keysToRemove) {
  const newObj = { ...obj };
  keysToRemove.forEach((key) => delete newObj[key]);
  return newObj;
}

export async function GET(request) {
  try {
    const file = await fs.readFile(process.cwd() + "/src/app/db.json", "utf8");
    const data = JSON.parse(file);

    const keysToRemove = [
      "planStartDate",
      "billingCycle",
      "ispPaymentResponsibility",
      "storage",
    ];

    const newData = data?.appliances?.map((appliance) =>
      removeKeys(appliance, keysToRemove)
    );

    return NextResponse.json(
      {
        success: true,
        appliances: newData,
      },
      { status: 200 }
    );
  } catch (error) {
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
