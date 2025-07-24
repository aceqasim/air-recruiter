"use client"
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { SidebarOptions } from "@/services/Constants"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
    const path = usePathname();
    return (
        <Sidebar>
            <SidebarHeader className="flex items-center justify-center" >
                <Image src="/logo.webp" alt="Logo" width={150} height={150} />
                <Button className={"bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full my-2 font-semibold "}> <PlusIcon className="mr-2 h-5 w-5" />Create New Interview</Button>
            </SidebarHeader>
            <SidebarContent>

                <SidebarGroup >
                    <SidebarContent>
                        <SidebarMenu>
                            {
                                SidebarOptions.map((option, index) => (
                                    <SidebarMenuItem key={index}>
                                        <SidebarMenuButton asChild>
                                            <Link className=
                                                {path === option.href ? "text-lg   bg-gray-50 text-blue-600 py-2 rounded-lg hover:bg-gray-100 w-full my-2 font-semibold " : "text-lg font-semibold py-3 my-2"} href={option.href}>
                                                <option.icon />
                                                <span>{option.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            }
                        </SidebarMenu>
                    </SidebarContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}