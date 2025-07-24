"use client"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import QuestionContainer from "./QuestionContainer.jsx"

export default function QuestionList({ formData }) {
    return (
        <Card className="w-full max-w-3xl mx-auto p-6 bg-white shadow-sm">
            <CardHeader className="pb-4">
                <CardTitle>Review Your Questions</CardTitle>
            </CardHeader>
            <QuestionContainer
                formData={formData}
            />
        </Card>
    )
}