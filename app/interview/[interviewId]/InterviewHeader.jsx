import Image from 'next/image'
import React from 'react'

const InterviewHeader = () => {
    return (
        <>
                <div className='flex items-center justify-between p-4 shadow-sm'>
                <Image  src="/logo.webp" alt="Logo" width={150} height={150} />
                <h1>Interview Header</h1>
            </div>
        </>
    )
}

export default InterviewHeader