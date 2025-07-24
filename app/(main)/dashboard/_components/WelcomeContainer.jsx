'use client'
import { useUser } from '@/app/provider'
import Image from 'next/image'

const WelcomeContainer = () => {
    const { user } = useUser()
    return (
        <div className="bg-white  rounded-2xl border-b border-gray-200 px-8 py-6  flex items-center justify-between">
            <header >
                <h1 className="text-lg font-bold ">Welcome Back, {user?.name}</h1>
                <p className="text-gray-500 mt-1 text-xs">AI-Driven Interviews, Hassel-Free Hiring</p>
            </header>
            <Image className='rounded-full' src={"https://lh3.googleusercontent.com/a/ACg8ocLxmF-4KLDzqztN9yKfwCpkio-poHMPF-tavTzV3qm4A8ptiA=s96-c"} alt="Logo" width={50} height={50} />
        </div>
    )
}

export default WelcomeContainer