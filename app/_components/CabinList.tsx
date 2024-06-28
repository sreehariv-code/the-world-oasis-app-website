import { getCabins } from "@/app/_lib/data-service";
import { CabinCardProps } from "@/app/_lib/types/CabinCardType";
import CabinCard from "./CabinCard";
import { unstable_noStore as noStore } from "next/cache";

interface CabinListProps {
  filter: "all" | "small" | "medium" | "large"; // Add your own filter logic here
}

export default async function CabinList({ filter }: CabinListProps) {
  //   noStore();
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayCabins: CabinCardProps[] = [];
  if (filter === "all") displayCabins = cabins;

  if (filter === "small")
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity >= 3);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabins.map((cabin: CabinCardProps) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
