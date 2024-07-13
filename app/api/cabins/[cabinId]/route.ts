import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

interface GETProps {
  params: {
    cabinId: string | number;
  };
}

//The function names should follow the HTTP verb name conventions (GET,POST,PUT)
export async function GET({ params }: GETProps): Promise<Response> {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (error) {
    return Response.json({ message: "Cabin is not found" });
  }
}
