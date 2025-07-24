"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/services/supabaseClient"

export default function QuestionContainerRaw({ router, oncreateLink }) {
    const [isSaving, setIsSaving] = useState(false)
    const [saveStatus, setSaveStatus] = useState({ success: null, message: '' })

    const questions = [
        {
            question: "What is a closure in JavaScript, and how is it used?",
            type: "Technical",
        },
        {
            question: "Tell me about a time you faced a difficult team situation. How did you resolve it?",
            type: "Behavioral",
        },
        {
            question: "Describe your experience working with REST APIs.",
            type: "Experience",
        },
        {
            question: "How would you optimize a React app's performance?",
            type: "Problem Solving",
        },
        {
            question: "Have you ever had to take a leadership role in a project? What did you learn?",
            type: "Leadership",
        },
    ]

    const handleFinish = async (e) => {
        e.preventDefault()
        setIsSaving(true)
        setSaveStatus({ success: null, message: '' })

        const payload = {
            jobPosition: "Frontend Developer",
            duration: "30",
            types: "Technical,Behavioral,Experience,Problem Solving,Leadership",
            questionList: questions,
            userEmail: "john.doe@example.com",
            interview_id: crypto.randomUUID(),
            description: "A frontend job needing React skills.",
            created_at: new Date().toISOString()
        }
        oncreateLink(payload.interview_id)

        try {

            const { data, error } = await supabase
                .from("interviews")
                .insert([payload])
                .select()

            if (error) throw error

            setSaveStatus({
                success: true,
                message: 'Interview saved successfully!'
            })
            // Optional: Redirect after successful save
            // router.push('/dashboard')
        } catch (error) {
            console.error(" Error saving interview:", error)
            setSaveStatus({
                success: false,
                message: error.message || 'Failed to save interview. Please try again.'
            })
        } finally {
            setIsSaving(false)
        }
    }

    const getTypeBadgeColor = (type) => {
        const colors = {
            'Technical': 'bg-blue-100 text-blue-800',
            'Behavioral': 'bg-green-100 text-green-800',
            'Experience': 'bg-purple-100 text-purple-800',
            'Problem Solving': 'bg-yellow-100 text-yellow-800',
            'Leadership': 'bg-red-100 text-red-800'
        }
        return colors[type] || 'bg-gray-100 text-gray-800'
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <Card className="border-blue-200">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Interview Questions</CardTitle>
                    <CardDescription className="text-gray-600">
                        Review and save your generated questions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {saveStatus.message && (
                        <Alert
                            variant={saveStatus.success ? 'default' : 'destructive'}
                            className={`mb-6 ${saveStatus.success ? 'border-green-200 bg-green-50' : ''}`}
                        >
                            {saveStatus.success ? (
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                                <AlertCircle className="h-4 w-4" />
                            )}
                            <AlertTitle className="ml-2">
                                {saveStatus.success ? 'Success!' : 'Error'}
                            </AlertTitle>
                            <AlertDescription className="ml-2">
                                {saveStatus.message}
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-4">
                        {questions.map((question, index) => (
                            <Card key={index} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-lg font-medium text-gray-900 mb-2">
                                                {index + 1}. {question.question}
                                            </p>
                                            <Badge variant="outline" className={getTypeBadgeColor(question.type)}>
                                                {question.type}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-end space-x-3">
                        <Button
                            variant="outline"
                            onClick={() => router.back()}
                            disabled={isSaving}
                            className="cursor-pointer"
                        >
                            Back
                        </Button>
                        <Button
                            onClick={handleFinish}
                            disabled={isSaving}
                            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Create Interview Link and Save'
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
