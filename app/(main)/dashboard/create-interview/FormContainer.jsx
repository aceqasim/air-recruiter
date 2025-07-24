import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { InterviewTypes } from '@/services/Constants'
import { ArrowLeft, MoveLeft, MoveLeftIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const FormContainer = ({ router, step, setStep, handleInputChnage, formData }) => {
    const [interviewType, setInterviewType] = useState([])
    useEffect(() => {
        if (interviewType) {
            handleInputChnage('interviewType', interviewType)
        }
    }, [interviewType])
    const addInterviewType = (type) => {
        const isExist = interviewType.includes(type)
        if (isExist) {
            setInterviewType(interviewType.filter((item) => item !== type))
        } else {
            setInterviewType([...interviewType, type])
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
            setStep(step + 1)
        // if (formData.jobPosition && formData.jobDescription && formData.duration && formData.interviewType) {
        // }
        // else {
        //     alert('Please fill all the fields')
        // }
    }

    return (
        step === 1 && (
            <div className='w-full mt-10 '>
                <div className='w-full rounded-lg  px-40 '>

                    <Card className="w-full max-w-2xl mx-auto">
                        <CardHeader className="border-b">
                            <CardTitle className='text-2xl font-bold  flex items-center gap-2'>
                                <ArrowLeft onClick={() => router.back()} className="h-5 w-5 cursor-pointer text-blue-500" />
                                Create Interview</CardTitle>

                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="jobPosition">Job Position</Label>
                                        <Input
                                            id="jobPosition"
                                            name="jobPosition"
                                            onChange={(e) => handleInputChnage(e.target.name, e.target.value)}
                                            placeholder="e.g. Senior Frontend Developer"


                                        />

                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="jobDescription">Job Description</Label>
                                        <Textarea
                                            id="jobDescription"
                                            name="jobDescription"
                                            onChange={(e) => handleInputChnage(e.target.name, e.target.value)}
                                            placeholder="Paste the job description here..."
                                        />

                                    </div>

                                    <div className="space-y-2 w   ">
                                        <Label>Interview Duration</Label>
                                        <Select className="w-full"
                                            onValueChange={(value) => handleInputChnage('duration', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select interview duration" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="15">15 minutes</SelectItem>
                                                <SelectItem value="30">30 minutes</SelectItem>
                                                <SelectItem value="45">45 minutes</SelectItem>
                                                <SelectItem value="60">60 minutes</SelectItem>
                                            </SelectContent>
                                        </Select>

                                    </div>

                                    <div className="space-y-2">
                                        <Label>Interview Types</Label>
                                        <div className="flex flex-wrap gap-4 pt-2">
                                            {InterviewTypes.map((type, index) => (
                                                <div onClick={() => addInterviewType(type.title)}
                                                    className={`    ${interviewType.includes(type.title) ? 'bg-blue-50 text-blue-600' : 'hover:text-blue-600'} flex items-center gap-2 border rounded-full px-2 py-1 cursor-pointer`} key={index}>
                                                    <type.icon size={10} />
                                                    <span className="text-xs">{type.title}</span>
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                                    >
                                        Generate Questions
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    )
}

export default FormContainer