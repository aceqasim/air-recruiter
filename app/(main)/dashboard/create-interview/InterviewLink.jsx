import { Button } from '@/components/ui/button'
import { ArrowBigLeft, Calendar, Clock, Copy, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const InterviewLink = ({ interviewId, formData, setStep }) => {
    const GetInterviewLink = (interviewId) => {
        const url = process.env.NEXT_PUBLIC_HOST_URL + `/${interviewId}`
        return url
    }
    console.log(formData)
    // console.log(formData.duration)
    return (
        <>
            <div className=' w-full border flex items-center flex-col justify-center gap-2  rounded-lg  border-gray-200 px-4 py-4 mt-2'>
                <Image className='w-[150px] h-[150px] object-cover' src="/check.webp" alt="Logo" width={150} height={150} />
                <div className=' w-full flex flex-col items-center justify-center gap-2'>
                    <h2 className='text-lg font-bold'>Your Ai Interview is Ready
                        <p className='text-gray-500 text-xs'>You can now share this link with your candidate</p>
                    </h2>
                    <div className='w-full mt-6 rounded-xl border border-gray-200 bg-white p-4'>
                        <div className='flex items-center justify-between p-2 '>
                            <h2 className='text-md font-bold'>Interview Link</h2>
                            <h2 className=' text-xs text-gray-500 px-3 py-2 border rounded-xl '>Valid For 30 Days</h2>
                        </div>

                        <div className='flex items-center justify-between  w-full  '>
                            <input disabled defaultValue={GetInterviewLink(interviewId)} className='w-9/12 rounded-sm border border-gray-200 p-2 text-sm' />
                            <button onClick={() => { navigator.clipboard.writeText(GetInterviewLink(interviewId)); alert("Link Copied") }} className='bg-blue-600 text-white px-6 py-2 flex items-center  rounded-md hover:bg-blue-700   my-2 font-semibold '>
                                <Copy className="mr-2 h-4 w-4" />  Copy Link
                            </button>
                        </div>
                        <br />
                        <hr className='w-full border-gray-200 my-6' />

                        <div className='w-full gap-4  mt-12 mb-6 flex justify-center items-center '>
                            <Link
                                href="/dashboard"
                                className="cursor-pointer  px-12 flex justify-center items-center gap-2"
                            >
                                <ArrowBigLeft /> Back to Dashboard
                            </Link>
                            <Button
                                onClick={() => setStep(1)}
                                className="bg-blue-600 px-16 py-4 hover:bg-blue-700 text-white cursor-pointer"
                            >
                                Create a New Interview <PlusIcon />
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default InterviewLink

// const payload = {
//     jobPosition: "Frontend Developer",
//     duration: "30",
//     types: "Technical,Behavioral,Experience,Problem Solving,Leadership",
//     questionList: questions,
//     userEmail: "john.doe@example.com",
//     interview_id: crypto.randomUUID(),
//     description: "A frontend job needing React skills.",
//     created_at: new Date().toISOString()
// }