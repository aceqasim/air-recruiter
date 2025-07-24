import { Sidebar } from '@/components/ui/sidebar'
import React from 'react'
import DashboardProvider from './Provider'


const DashboardLayout = ({ children }) => {
    return (
        <div className="bg-secondary">
            <DashboardProvider>

                <div className=" w-full ">
                    {children}
                </div>
            </DashboardProvider>
        </div>
    )
}

export default DashboardLayout