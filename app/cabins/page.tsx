import { Suspense } from "react";

import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";

export const metadata = {
  title: "Cabins",
};

export default async function Page() {
  // CHANGE
  // const cabins = [];
  // const cabins = await getCabins();

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

      {/* More Granular Approach for Streaming data */}
      {/* Suspense should be outside of asynchronous function. So, the asynchronous code should be moved to a seperate component  */}
      {/* Better approach to have an imporved UX */}
      <Suspense fallback={<Spinner />}>
        <CabinList />
      </Suspense>
    </div>
  );
}
