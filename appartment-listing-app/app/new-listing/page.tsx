'use client'
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WithValue } from "@/utils";
import InputComponent from "@/components/Input.component";


export default function NewListing() {
    const [enabled, setEnabled] = useState(false);
    const [name, setName] = useState("");
    const [unitNumber, setUnitNumber] = useState(0);
    const [project, setProject] = useState("");
    const [errors,setErrors] = useState({unitNumber:true,project:true,name:true})
    const router = useRouter();
    const onClick = async () => {
        await fetch('http://localhost:3002/listing', { method: 'POST', body: JSON.stringify({ name:name, unitNumber:unitNumber, project: project }), headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, });
        router.push('/');
    }

    useEffect(() => {
        if (project && unitNumber && name) setEnabled(true);
        else setEnabled(false);
    }, [unitNumber, project, name])
    
    return (
        <div className="grid grid-cols-3  bg-white text-gray-950 min-h-screen">
            <main className="col-start-1 col-span-3 md:col-start-2 md:col-span-1 items-center">
                <div className="text-5xl mb-[2vh] text-center md:text-justify mt-[1vh]">
                New Listing
                </div>
                <div>
                    <InputComponent name="name" label="Name" type="text" errors={errors} reference={undefined} onChange={(v: ChangeEvent) => {
                        const value = (v.currentTarget as unknown as WithValue).value;
                        const condition = !value;
                        setErrors(errors => {return {...errors, name:(condition)? true: false};})
                        setName((condition)?"":value)
                    }}/>
                    <InputComponent name="unitNumber" label="Unit Number" type="number" errors={errors} reference={undefined} onChange={(v: ChangeEvent) => {
                        const value = +(v.currentTarget as unknown as WithValue).value;
                        const condition = isNaN(value) || !value;
                        setErrors(errors => {return {...errors, unitNumber:(condition)?true:false};})
                        setUnitNumber(condition ? 0 : value);
                    }} />
                    <InputComponent name="project" label="Project" type="text" errors={errors} reference={undefined} onChange={(v: ChangeEvent) => {
                        const value = (v.currentTarget as unknown as WithValue).value;
                        const condition = !value;
                        setErrors(errors => {return {...errors,project:(condition)? true:false};})
                        setProject(condition ? "" : value);
                    }}/>
                    <button className="mt-[3vh] text-2xl text-red-700 border-4 border-red-500" style={{opacity:enabled?'100%':'50%'}} disabled={!enabled} onClick={onClick}>Save</button>
            </div>
      </main>
    </div>
  );
}
