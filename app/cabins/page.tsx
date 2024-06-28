import { Suspense } from "react";

import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import Filter from "../_components/Filter";

interface SearchParamsProps {
  searchParams: {
    capacity?: "all" | "small" | "medium" | "large";
  };
}

//only workd for statically generated pages
export const revalidate = 3600; // Once per hour

export const metadata = {
  title: "Cabins",
};

export default function Page({ searchParams }: SearchParamsProps) {
  // CHANGE
  // const cabins = [];
  // const cabins = await getCabins();

  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      {/* More Granular Approach for Streaming data */}
      {/* Suspense should be outside of asynchronous function. So, the asynchronous code should be moved to a seperate component  */}
      {/* Better approach to have an imporved UX */}
      <Suspense fallback={<Spinner />} key={filter}>
        {/* Filter cabins based on searchParams */}
        {/* CabinList is a server component */}
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
