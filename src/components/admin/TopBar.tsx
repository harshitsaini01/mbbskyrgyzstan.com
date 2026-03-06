"use client";

import { signOut, useSession } from "next-auth/react";
import { Bell, ChevronDown, LogOut, User, Settings } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AdminTopBar() {
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
            {/* Left: breadcrumb placeholder */}
            <div className="text-sm text-gray-500">
                Welcome back, <span className="font-medium text-gray-800">{user?.name || "Admin"}</span>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-3">
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative text-gray-500 hover:text-gray-800">
                    <Bell size={18} />
                </Button>

                {/* User menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 px-2">
                            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-semibold">
                                {user?.name?.charAt(0)?.toUpperCase() || "A"}
                            </div>
                            <span className="hidden md:block max-w-[120px] truncate">{user?.name || "Admin"}</span>
                            <ChevronDown size={14} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>
                            <div className="font-medium truncate">{user?.name}</div>
                            <div className="text-xs text-gray-400 truncate">{user?.email}</div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/admin/profile" className="cursor-pointer">
                                <User size={14} className="mr-2" /> My Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/admin/settings" className="cursor-pointer">
                                <Settings size={14} className="mr-2" /> Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-600 cursor-pointer"
                            onClick={() => signOut({ callbackUrl: "/admin/login" })}
                        >
                            <LogOut size={14} className="mr-2" /> Sign Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
