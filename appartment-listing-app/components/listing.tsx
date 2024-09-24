import Link from "next/link";

export default function Listing(props:{ name: string, id: number }) {
  return (
      <Link className="border-b-2 border-gray-300 grid grid-cols-3 min-w-[100%] mb-[1vh] px-[1vh] md:px-0" href={`/listings/${props.id}`}>
          <div className="font-xl col-start-1 col-span-3  mr-[1vw] text-left">{props.name}</div>
    </Link>
  );
}
