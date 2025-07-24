import { NextResponse } from "next/server";
import OpenAI from "openai";
import { INTERVIEW_QUESTION_PROMPT } from "@/services/Constants";

export async function POST(req) {
    try {
        const requestData = await req.json();
        const { jobPosition, jobDescription, duration, interviewType } = requestData;

        console.log("Received request data:", requestData);

        if (!jobPosition || !jobDescription) {
            const errorMsg = `Missing required fields. Received: ${JSON.stringify({
                jobPosition: !!jobPosition,
                jobDescription: !!jobDescription,
                duration,
                interviewType
            })}`;
            console.error("Validation error:", errorMsg);
            return NextResponse.json(
                {
                    success: false,
                    error: "jobPosition and jobDescription are required",
                    details: errorMsg
                },
                { status: 400 }
            );
        }

        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            console.error("OpenRouter API key is not configured");
            return NextResponse.json(
                {
                    success: false,
                    error: "Server configuration error",
                    details: "OpenRouter API key is not configured"
                },
                { status: 500 }
            );
        }

        console.log("Initializing OpenAI client with base URL:", "https://openrouter.ai/api/v1");

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: apiKey,
        });

        const prompt = INTERVIEW_QUESTION_PROMPT
            .replace("{{jobTitle}}", jobPosition)
            .replace("{{jobDescription}}", jobDescription)
            .replace("{{duration}}", duration || '30 minutes')
            .replace("{{types}}", Array.isArray(interviewType) ? interviewType.join(", ") : "Technical");

        console.log("Sending prompt to AI model:", prompt);

        try {
            const completion = await openai.chat.completions.create({
                model: "moonshotai/kimi-dev-72b:free",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                max_tokens: 250,
            });

            console.log("Received response from AI model:", JSON.stringify(completion, null, 2));

            if (!completion.choices?.[0]?.message?.content) {
                throw new Error("Invalid response format from AI model");
            }

            let questions = [];
            try {
                const responseContent = JSON.parse(completion.choices[0].message.content);
                questions = Array.isArray(responseContent?.questions)
                    ? responseContent.questions
                    : [];

                console.log("Successfully parsed questions:", questions);

                return NextResponse.json({
                    success: true,
                    questions
                });

            } catch (parseError) {
                console.error("Error parsing AI response:", parseError);
                console.error("Raw response content:", completion.choices[0]?.message?.content);

                return NextResponse.json({
                    success: false,
                    error: "Failed to parse AI response",
                    details: process.env.NODE_ENV === 'development' ? parseError.message : undefined
                }, { status: 500 });
            }

        } catch (apiError) {
            console.error("Error calling AI model:", apiError);
            return NextResponse.json(
                {
                    success: false,
                    error: "Failed to generate questions",
                    details: process.env.NODE_ENV === 'development' ? apiError.message : undefined
                },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error("Unexpected error in API route:", error);
        return NextResponse.json(
            {
                success: false,
                error: "An unexpected error occurred",
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 500 }
        );
    }
}