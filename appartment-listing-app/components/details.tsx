
export default function Details({ name, unitNumber, project }: { name: string, unitNumber: number, project: string }) {
    return <div className="px-[4vw] md:p-0">
        <div className="text-5xl mb-[10%] mt-[5vh] text-center md:text-justify">{ name}</div>
         <table className="border-separate border-spacing-2 min-w-full">
            <tbody>
                <tr>
                    <th className="pr-[1vw]">Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td className="pr-[1vw]">Project</td>
                    <td>{project}</td>
                </tr>
                <tr>
                    <td className="pr-[1vw]">Unit Number</td>
                    <td >{unitNumber}</td>
                </tr>
            </tbody>
        </table> 
    </div>
}