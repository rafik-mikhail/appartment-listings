'use client'
import Details from "@/components/details";
import { listing } from "@/utils";
import { useEffect, useState } from "react";


export default function Page({ params }: { params: { listing: string } }) {
    const [data, setData] = useState< listing | null>(null);
    
    useEffect(() => {
        (async () => {
            const id = params.listing;
            const data = await fetch(`http://localhost:3002/listing/${id}`);
            setData(await data.json());
        })()
    },[params.listing])
    return <div className="grid grid-cols-3  bg-white text-gray-950 min-h-screen">
            <div className="col-start-1 col-span-3 md:col-start-2 md:col-span-1 items-center text-left text-l">
                {data && <Details name={data?.name} unitNumber={data?.unitNumber} project={data?.project} />}
            </div>
        </div>
}