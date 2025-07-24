"use client"
import { Button } from "@/components/ui/button"
import { Camera, PlusIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"


const LatestInterViewList = () => {
    const [interviewList, setInterviewList] = useState([])
    return (
        <div className="my-5 ">
            <h2 className="text-lg font-bold">Previously Created  Interviews</h2>
            {interviewList.length === 0 && (
                <div className="bg-whi te my-4 rounded-lg border-b border-gray-200 px-4 py-4 flex flex-col items-center gap-3">
                    <Camera className="text-blue-600 bg-blue-50 p-2 rounded-md" size={40} />
                    <p className="text-gray-500 mt-1 text-xs ">No interviews found</p>
                    <Link href="/dashboard/create-interview" className="bg-blue-600 text-white px-6 py-2 flex items-center gap-2 rounded-lg hover:bg-blue-700 mx-auto my-2 font-semibold ">
                        <PlusIcon className="mr-2 h-5 w-5" />Create New Interview</Link>
                </div>
            )}
        </div>
    )
}

export default LatestInterViewList