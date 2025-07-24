"use client"
import React, { useState, useEffect, useContext } from 'react'
import Vapi from '@vapi-ai/web'
import { Mic, MicOff, Video, VideoOff, Clock } from 'lucide-react'
import InterviewContext from '@/context/InterviewContext'

const StartInterview = () => {
    const [isMicOn, setIsMicOn] = useState(true)
    const [isCameraOn, setIsCameraOn] = useState(false)
    const [timeElapsed, setTimeElapsed] = useState(0)
    const { interviewInfo } = useContext(InterviewContext)
    const [questionString, setQuestionString] = useState('')
    const vapi = new Vapi('9979c5f2-eac8-4215-821c-97349add3655')

    const name = typeof window !== 'undefined' && (localStorage.getItem('userName') || localStorage.getItem('name')) || interviewInfo?.name || 'Candidate'

    const handleEndInterview = () => {
        const confirmEnd = confirm('Are you sure you want to end the interview?')
        if (confirmEnd) {
            vapi.stop()
            alert('Interview ended successfully')
        }

    }
    // Build question string when interviewInfo is available
    useEffect(() => {
        if (interviewInfo?.questionList?.length > 0) {
            const qs = interviewInfo.questionList.map(q => q.question).join(', ')
            setQuestionString(qs)
        }

    }, [interviewInfo])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0')
        const secs = (seconds % 60).toString().padStart(2, '0')
        return `${mins}:${secs}`
    }

    // Example of how you'd use questionString dynamically
    useEffect(() => {
        if (!questionString) return;
        const assistantOptions = {
            name: "AI Recruiter",
            firstMessage: `Hi ${name}, how are you? Ready for your interview on ${interviewInfo?.jobPosition}?`,
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            voice: {
                provider: "playht",
                voiceId: "jennifer",
            },
            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.

Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ${interviewInfo?.jobPosition} interview. Let's get started with a few questions!"

Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise.
Below are the questions one by one:
Questions: ${questionString}

If the candidate struggles, offer hints or rephrase the question without giving away the answer.
Provide brief, encouraging feedback after each answer.
After 5-7 questions, wrap up the interview and provide a positive closing message.
                        `.trim(),
                    },
                ],
            },
        }

        console.log("Prepared assistant config:", assistantOptions)
        vapi.start(assistantOptions)
    }, [questionString])
    console.log(questionString)

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700">
                <h1 className="text-xl font-semibold">AI Interview Session</h1>
                <div className="flex items-center gap-2 bg-gray-700 px-3 py-1.5 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span className="font-mono">{formatTime(timeElapsed)}</span>
                </div>
            </header>

            {/* Main */}
            <main className="container mx-auto p-4 flex flex-col lg:flex-row gap-6 h-[calc(100vh-180px)]">
                <div className="flex-1 bg-black rounded-xl overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-32 h-32 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-4xl">🤖</span>
                            </div>
                            <p className="text-gray-300">AI Interviewer</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-gray-800 rounded-xl overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-4xl">👤</span>
                            </div>
                            <p className="text-gray-300">You</p>
                        </div>
                    </div>
                </div>
            </main>


            <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 border-t border-gray-700">
                <div className="flex flex-col items-center">
                    <div className="flex gap-6 mb-2">
                        <button
                            onClick={() => setIsMicOn(!isMicOn)}
                            className={`p-3 rounded-full ${isMicOn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'} transition-colors`}
                        >
                            {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                        </button>
                        <button
                            onClick={() => setIsCameraOn(!isCameraOn)}
                            className={`p-3 rounded-full ${isCameraOn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'} transition-colors`}
                        >
                            {isCameraOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                        </button>
                        <button
                            onClick={() => handleEndInterview()}
                            className={`p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors`}
                        >
                            End Interview
                        </button>
                    </div>
                    <p className="text-gray-400 text-sm">Interview in progress...</p>
                </div>
            </footer>
        </div>
    )
}

export default StartInterview
