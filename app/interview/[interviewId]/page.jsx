"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Video, Monitor, Clock } from 'lucide-react'
import { supabase } from '@/services/supabaseClient'

const InterviewPage = () => {
    const { interviewId } = useParams()
    const [interviewData, setInterviewData] = useState()
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [interviewInfo, setInterviewInfo] = useState(JSON.parse(localStorage.getItem('interviewInfo')))
    const router = useRouter()
    const getInterviewDetails = async () => {
        try {
            setLoading(true)
            let { data: Interviews, error } = await supabase
                .from('interviews')
                .select('jobPosition,description, duration, types, interview_id')
                .filter('interview_id', 'eq', interviewId)
            setInterviewData(Interviews[0])
            setInterviewInfo({
                name: name,
                questionList: Interviews[0].questionList,
            })
            if (Interviews.length === 0) {
                alert("Interview Not Found")

            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            alert(error)
            setLoading(false)
        }
    }

    const joinInterview = async () => {
        try {
            let { data: interviews, error } = await supabase
                .from('interviews')
                .select('*')
                .filter('interview_id', 'eq', interviewId)

            if (error) throw error

            // Store interviewInfo in localStorage
            const interviewInfo = {
                name: name,
                interviewId: interviewId,
                jobPosition: interviews[0].jobPosition,
                duration: interviews[0].duration,
                questionList: interviews[0].questionList
            }
            localStorage.setItem('interviewInfo', JSON.stringify(interviewInfo))
            setInterviewInfo(interviewInfo)

            router.push(`/interview/${interviewId}/start`)
        } catch (error) {
            console.error('Error joining interview:', error)
            alert('Failed to start interview. Please try again.')
        }
    }

    useEffect(() => {
        getInterviewDetails()
    }, [interviewId])

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-blue-600">Alcruiter</h1>
                        <p className="text-gray-500">AI-Powered Interview Platform</p>
                    </div>

                    <div className="mt-8 text-center">
                        <div className="relative w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                            {/* <Image src="/login.webp" alt="Logo" width={400} height={400} /> */}
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <Monitor className="h-12 w-12 text-gray-400" />
                                </div>
                                <p className="text-gray-400">Interview Illustration</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-center mb-2">{loading ? "Loading..." : interviewData?.jobPosition}</h2>
                    <div className="flex justify-center gap-6 text-gray-600 mb-8">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span>Google Inc.</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{loading ? "Loading..." : interviewData?.duration} Minutes</span>
                        </div>
                    </div>

                    <div className="mb-8">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Enter your full name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., John Smith"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg mb-8">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-medium text-blue-800 mb-2">Before you begin</h3>
                                <ul className="text-sm text-blue-700 space-y-1.5">
                                    <li className="flex items-start gap-2">
                                        <span>•</span>
                                        <span>Ensure you have a stable internet connection</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>•</span>
                                        <span>Test your camera and microphone</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>•</span>
                                        <span>Find a quiet place for the interview</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={joinInterview}
                            disabled={!name.trim()}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium ${name.trim() ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'} transition`}
                        >
                            <Video className="w-5 h-5" />
                            Join Interview
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Test Audio & Video
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InterviewPage