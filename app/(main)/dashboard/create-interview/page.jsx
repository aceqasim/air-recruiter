
"use client"
import React, { useState } from 'react'
import DashboardLayout from '@/app/(main)/Layout'
import FormContainer from './FormContainer'
import { useRouter } from 'next/navigation'
import QuestionRaw from './QuestionRaw'
import InterviewLink from './InterviewLink'

const CreateInterview = () => {
    const [step, setStep] = useState(1)
    const router = useRouter()
    const [formData, setFormData] = useState({})
    const [interviewId, setInterviewId] = useState('')


    const oncreateLink = (interviewId) => {
        console.log(interviewId)
        setInterviewId(interviewId)
        setStep(3)
    }

    const handleInputChnage = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        })
        console.log(formData) // This will show old value due to state batching
    }
    return (
        <DashboardLayout>
            {
                step === 1 && (
                    <FormContainer formData={formData} handleInputChnage={handleInputChnage} router={router} step={step} setStep={setStep} />
                )
            }
            {
                step === 2 && (
                    <QuestionRaw formData={formData} router={router} step={step} setStep={setStep} oncreateLink={oncreateLink} />
                )
            }
            {
                step === 3 && (
                    <InterviewLink interviewId={interviewId} router={router} formData={formData} step={step} setStep={setStep} />
                )
            }
        </DashboardLayout>
    )
}
export default CreateInterview