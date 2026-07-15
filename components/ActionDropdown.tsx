"use client"

import { Models } from "node-appwrite"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react"
import { ACTION_ITEMS } from "@/lib/constants"
import { constructDownloadUrl } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"
import { ActionItem } from "@/lib/types"

const ActionDropdown = ({ file }: { file: Models.DefaultRow }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isActionListOpen, setIsActionListOpen] = useState(false);
    const [actionItem, setActionItem] = useState<ActionItem | null>(null);

    const renderDialogContent = () => {
        if(!isModalOpen) {
            return null;
        }

        const {label} = actionItem || {};

        return (
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{label}</DialogTitle>
                </DialogHeader>
            </DialogContent>
        )
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DropdownMenu  open={isActionListOpen} onOpenChange={setIsActionListOpen}>
                <DropdownMenuTrigger>
                    <EllipsisVertical className="text-gray-600" />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="min-w-52 border-none rounded-xl">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-base font-medium w-56 truncate">{file.name}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {ACTION_ITEMS.map((item) => {
                            const { label, value, icon: Icon, iconColor, iconBgColor } = item || {};

                            return <DropdownMenuItem key={value} className="text-base mt-2 cursor-pointer"
                                onClick={() => { 
                                    if (["rename", "share", "delete", "details"].includes(value)) {
                                        setActionItem(item); 
                                        setIsModalOpen(true);
                                    }
                                    }
                                }
                            >
                                {value === "download" ? (
                                    <Link href={constructDownloadUrl(file.bucketFileId)}>
                                        <div className="w-full flex items-center gap-2">
                                            <div className={`${iconBgColor} w-8 h-8 flex items-center justify-center rounded-full`}>
                                                <Icon className={iconColor} />
                                            </div>
                                        {label}
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="w-full flex items-center gap-2">
                                        <div className={`${iconBgColor} w-8 h-8 flex items-center justify-center rounded-full`}>
                                            <Icon className={iconColor} />
                                        </div>
                                        {label}
                                    </div>
                                )}
                            </DropdownMenuItem>
                        })}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {renderDialogContent()}
        </Dialog >
    )
}

export default ActionDropdown
