import { HomeIcon, CalendarIcon, ListIcon, CreditCardIcon, SettingsIcon, Code2Icon, User2Icon, BriefcaseBusiness, Puzzle } from "lucide-react";


export const SidebarOptions = [


    {
        name: "Dashboard",
        href: "/dashboard",
        icon: HomeIcon,

    },
    {
        name: "Schedule Interview",
        href: "/schedule-interview",
        icon: CalendarIcon,

    },
    {
        name: "All Interview",
        href: "/all-interview",
        icon: ListIcon,

    },
    {
        name: "Billing",
        href: "/billing",
        icon: CreditCardIcon,

    },
    {
        name: "Settings",
        href: "/settings",
        icon: SettingsIcon,

    },

]

// {["Technical", "Behavioral", "System Design", "Problem Solving"].map((type) => (
export const InterviewTypes = [
    {
        title: "Technical",
        icon: Code2Icon,
    },
    {
        title: "Behavioral",
        icon: User2Icon,
    },
    {
        title: "System Design",
        icon: BriefcaseBusiness,
    },
    {
        title: "Problem Solving",
        icon: Puzzle,
    },
]

export const INTERVIEW_QUESTION_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}} minutes
Interview Types: {{types}}

Your task:
- Analyze the job description to identify key responsibilities, required skills, and expected experience.
- Generate a list of interview questions tailored to the interview duration.
- Adjust the number and depth of questions to match the interview duration (e.g., fewer questions for shorter durations, more detailed for longer).
- Ensure the questions match the tone and structure of a real-life {{types}} interview.
- Format your response in JSON format with an array list of questions.
- Format: {"questions": [{"question": "...", "type": "Technical/Behavioral/Experience/Problem Solving/Leadership"}, {...}]}`;
