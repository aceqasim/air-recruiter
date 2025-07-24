"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useUser } from "@/app/provider"
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables. Please check your .env.local file.')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default function QuestionContainer({ formData }) {
    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState([])
    const [error, setError] = useState(null)
    const [finishLoading, setFinishLoading] = useState(false)
    const { user } = useUser()

    useEffect(() => {
        if (formData) {
            generateAiQuestions()
        }
    }, [formData])

    const generateAiQuestions = async () => {
        setLoading(true)
        setError(null)
        try {
            console.log('Sending request to /api/ai-model with data:', formData)
            const response = await axios.post('/api/ai-model', {
                ...formData
            })
            console.log('Received response:', response.data)

            if (!response.data || !Array.isArray(response.data.questions)) {
                throw new Error('Invalid response format from AI service')
            }

            setQuestions(response.data.questions)
        } catch (error) {
            console.error('Error generating questions:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                config: {
                    url: error.config?.url,
                    method: error.config?.method,
                    data: error.config?.data,
                },
            })

            const errorMessage = error.response?.data?.error ||
                error.response?.data?.message ||
                'Failed to generate questions. Please try again.'

            setError({
                title: 'Error Generating Questions',
                message: errorMessage,
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        } finally {
            setLoading(false)
        }
    }

    const onFinish = async () => {
        if (!supabase) {
            setError("Database connection error. Please try again later.")
            return
        }

        setFinishLoading(true)
        setError(null)

        try {
            const newInterviewId = uuidv4()
            const { data, error: supabaseError } = await supabase
                .from('interviews')
                .insert([
                    {
                        ...formData,
                        questionList: questions,
                        userEmail: user?.email || "",
                        interview_id: newInterviewId
                    },
                ])
                .select()

            if (supabaseError) throw supabaseError

            // Notify parent component that interview was created


        } catch (error) {
            console.error('Error saving interview:', error)
            setError(error.message || "Failed to save interview. Please try again.")
        } finally {
            setFinishLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="mt-2 text-sm text-gray-600">Generating questions...</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {error && (
                <Alert variant="destructive">
                    <AlertTitle>{error.title}</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                    {error.details && (
                        <AlertDescription className="text-sm text-gray-600">{error.details}</AlertDescription>
                    )}
                </Alert>
            )}

            {questions.length > 0 ? (
                <div className="space-y-4">
                    {questions.map((question, index) => (
                        <div
                            key={index}
                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                            <p className="text-gray-800 mb-1">{question.question}</p>
                            <p className="text-sm text-blue-600">Type: {question.type}</p>
                        </div>
                    ))}
                    <div className="flex justify-end mt-6 space-x-3">
                        <Button
                            variant="outline"
                            onClick={generateAiQuestions}
                            disabled={loading || finishLoading}
                        >
                            {loading ? 'Regenerating...' : 'Regenerate'}
                        </Button>
                        <Button
                            onClick={onFinish}
                            className="bg-green-600 hover:bg-green-700 text-white"
                            disabled={finishLoading}
                        >
                            {finishLoading ? 'Creating...' : 'Create interview link and finish'}
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    No questions generated yet. Please try again.
                </div>
            )}
        </div>
    )
}
