import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const file = await fs.readFile(process.cwd() + "/db.json", "utf8");
    const data = JSON.parse(file);
    const applianceId = params["appliance-id"];
    const filterData = data?.appliances?.filter((appliance) => {
      return appliance.serialNo === applianceId;
    });
    if (filterData.length) {
      return NextResponse.json(
        {
          success: true,
          data: filterData[0],
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          httpStatus: 404,
          httpCode: "NOT_FOUND",
          success: false,
          error: [
            {
              code: 404,
              message: "Appliance not found",
            },
          ],
        },
        { status: 404 }
      );
    }
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
