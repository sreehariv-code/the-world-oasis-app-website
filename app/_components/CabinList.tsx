import { getCabins } from "@/app/_lib/data-service";
import { CabinCardProps } from "@/app/_lib/types/CabinCardType";
import CabinCard from "./CabinCard";
import { unstable_noStore as noStore } from "next/cache";

export default async function CabinList() {
  //   noStore();
  const cabins = await getCabins();

  if (!cabins.length) return null;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin: CabinCardProps) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
