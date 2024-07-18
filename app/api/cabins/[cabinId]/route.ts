import { NextRequest, NextResponse } from "next/server";
import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const cabinId = searchParams.get("cabinId");

  if (!cabinId) {
    return NextResponse.json(
      { message: "Cabin ID is required" },
      { status: 400 }
    );
  }

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return NextResponse.json({ cabin, bookedDates });
  } catch (error) {
    return NextResponse.json(
      { message: "Cabin is not found" },
      { status: 404 }
    );
  }
}
