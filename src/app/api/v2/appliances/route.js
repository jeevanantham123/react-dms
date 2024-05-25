import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const file = await fs.readFile(process.cwd() + "/db.json", "utf8");
    const data = JSON.parse(file);
    return NextResponse.json(
      {
        success: true,
        data: data?.appliances,
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
