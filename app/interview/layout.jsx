"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import InterviewHeader from './[interviewId]/InterviewHeader'
import InterviewContext from '@/context/InterviewContext'
import { supabase } from '@/services/supabaseClient'

const InterviewLayout = ({ children }) => {
    const [interviewInfo, setInterviewInfo] = useState()
    const { interviewId } = useParams()

    useEffect(() => {
        const fetchInterviewData = async () => {
            if (!interviewId) return;
            console.log(interviewId)
            try {
                const { data: interviews, error } = await supabase
                    .from('interviews')
                    .select('*')
                    .filter('interview_id', 'eq', interviewId)
                    .single();

                if (error) throw error;

                // Store complete interview data in localStorage
                const completeInterviewInfo = {
                    ...interviews,
                    interviewId: interviewId
                };
                localStorage.setItem('interviewInfo', JSON.stringify(completeInterviewInfo));
                setInterviewInfo(completeInterviewInfo);
            } catch (error) {
                console.error('Error fetching interview data:', error);
            }
        };

        fetchInterviewData();
    }, [interviewId]);

    return (
        <InterviewContext.Provider value={{ interviewInfo, setInterviewInfo }}>
            <div>
                <InterviewHeader />
                {children}
            </div>
        </InterviewContext.Provider>
    )
}

export default InterviewLayout