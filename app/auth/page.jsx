"use client"
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import Image from 'next/image'
import React from 'react'

const Login = () => {
    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",

        })
        if (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-white p-6 rounded-lg shadow text-center">
                <div className="mb-6 mx-auto flex justify-center items-center">
                    <Image
                        width={200}
                        height={100}
                        alt="AIcruiter Logo"
                        src="/logo.webp"
                    />
                </div>
                <div><Image alt='image' src={'/login.webp'} width={400} height={100} /></div>
                <h2 className="text-2xl font-bold my-4">Welcome to AIcruiter</h2>
                <p className="text-gray-600 mb-3 text-">Sign In with Google Authentication</p>
                {/* <button> */}
                <Button onClick={signInWithGoogle} className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    Login with Google
                </Button>
                {/* </button> */}
            </div>
        </div>
    )
}

export default Login