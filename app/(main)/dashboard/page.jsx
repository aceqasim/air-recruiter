import React from 'react'
import DashboardLayout from '@/app/(main)/Layout'
import CreateOptions from './_components/CreateOptions'
import LatestInterViewList from './_components/LatestInterViewList'

const Dashboard = () => {
    return (
        <>
        // <DashboardLayout>
                <h1 className='text-2xl font-bold my-4'>Dashboard</h1>
                <CreateOptions />
                <LatestInterViewList />
        // </DashboardLayout>
        </>
    )
}

export default Dashboard