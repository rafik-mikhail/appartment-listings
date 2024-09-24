import { Suspense } from "react";
import Link from "next/link";
import Listings from "@/components/listings";

export default function Home() {
  
    return (
        <div className="grid grid-cols-3  bg-white text-gray-950 min-h-screen">
          <main className="col-start-1 col-span-3 md:col-start-2 md:col-span-1 items-center">
            <div className="text-5xl mb-[2vh] text-center md:text-justify mt-[1vh]">
              Listings
            </div>
            <Link className="ml-[80%] border-4 border-blue-400 border-double mb-[2vh] decoration-double underline p-1 decoration-red-700" href="/new-listing">
              New Listing
          </Link>
          <Suspense>
            <Listings />
            </Suspense>
      </main>
    </div>
  );
}
