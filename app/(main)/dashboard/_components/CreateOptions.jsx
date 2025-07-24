"use client"
import { PhoneCall, Video } from 'lucide-react'

const CreateOptions = () => {


    return (
        <>

            <div className=' rounded-2xl border-b border-gray-200 py-6 grid grid-cols-2 gap-4'>
                <div className=' bg-white rounded-lg border-b border-gray-200 px-4 py-4'>
                    <Video size={40} className="  text-blue-600 bg-blue-50 p-2 rounded-md" />
                    <h2 className='text-md font-bold'>Create New Interview</h2>
                    <p className='text-gray-500 text-xs'>Create a new interview and schedule it with your candidate</p>
                </div>
                <div className=' bg-white rounded-lg border-b border-gray-200 px-4 py-4'>
                    <PhoneCall size={40} className="  text-blue-600 bg-blue-50 p-2 rounded-md" />
                    <h2 className='text-md font-bold'>Create Phone Screening Call </h2>
                    <p className='text-gray-500 text-xs'>Create a new interview and schedule it with your candidate</p>
                </div>
            </div>
        </>
    )
}

export default CreateOptions