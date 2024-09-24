'use client'
import Listing from "@/components/listing";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { listing, WithValue } from "@/utils";
import InputComponent from "./Input.component";

export default function Home() {
  const [data, setData] = useState<{listings:listing[],count:number}>({listings:[],count:0});
  
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [backDisabled, setbackDisabled] = useState(true);
  const [nextOpacity, setNextOpacity] = useState('50%');
  const [backOpacity, setbackOpacity] = useState('50%');
  const [search, setSearch] = useState('');
  const router = useRouter();
  
    useEffect(() => {
      (async () => {
        const paramPage = +(searchParams.get('page') as string);
        const search = searchParams.get('search') as string || "";
        setSearch(search);
        const page = paramPage > 1 ? paramPage : 1;
        if (page && page >= 1) setPage(page);
        const data = await fetch(`http://localhost:3002/listings?page=${page}&search=${search}`);
        const dataJson = await data.json();
        setData(dataJson);
        setbackOpacity(page > 1 ? '100%' : '50%');
        setNextOpacity(dataJson?.count > 5 * page ? '100%' : '50%');
        setbackDisabled(page <= 1);
        setNextDisabled(dataJson?.count <= 5 * page); /**page count is 5 */
        })()
    },[searchParams])
    return (
      <>
        <div className="grid grid-rows-5">
          {(data?.listings?.length > 0) && data.listings.map((listing, i) => <Listing key={i} name={listing.name} id={listing.id} />)}
        </div>
        <div className="grid grid-cols-5 mt-[1vh]">
          <button className="col-start-1 col-span-1 mr-[3vw]" style={{opacity:backOpacity}} disabled={backDisabled} onClick={()=>{router.push(`/?page=${page-1}&search=${search}`)}}>back</button>
          <button className="col-start-5 col-span-1 ml-[2vw]" style={{opacity:nextOpacity}} disabled={nextDisabled} onClick={()=>{router.push(`/?page=${page+1}&search=${search}`)}}>next</button>
        </div>
        <div className="max-w-[80%] text-gray-300 max-h-[40%] mt-[15%] ml-[10%]">
          <InputComponent
            name='search' label='Search' type='text' errors={{}} value={search} required={false}
            onChange={(v) => { router.push(`/?page=${1}&search=${(v.currentTarget as WithValue).value}`) }} />
        </div>
      </>
  );
}
