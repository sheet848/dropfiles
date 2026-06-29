"use client"
import { SIDEBAR_ITEMS, USER_ICON } from "@/lib/constants";
import { Layers } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Progress from "./Progress";
import Image from "next/image";

const Sidebar = ({ fullName, fileSize }: {
    fullName: string;
    fileSize: string;
}) => {

    const pathName = usePathname();

    return (
        <aside className="w-66 p-4 pt-8 bg-white pb-38">
            <div className="flex items-center justify-start gap-3">
                <Layers className="w-10 h-10 text-froly" />
                <span className="font-medium text-xl">DropFiles</span>
            </div>

            <div className="flex flex-col mt-8 gap-4 h-[85%]">
                {
                    SIDEBAR_ITEMS.map((sidebar) => {
                        const { name, icon: Icon, url } = sidebar || {};
                        const bgClass = pathName === url ? "bg-froly" : "";
                        const textClass = pathName === url ? "text-white" : "text-gray-700";

                        return (
                            <Link className={cn(`flex items-center justify-start gap-3 cursor-pointer py-2 px-3 rounded-md`, bgClass)} key={url} href={url}>
                                <Icon className={cn(`w-5 h-5`, textClass)} />
                                <span className={cn(`font-medium`, textClass)}>{name}</span>
                            </Link>
                        )
                    })
                }
            </div>

            <div className="flex flex-col gap-4">
                <div className="bg-froly flex flex-col px-4 pt-2 pb-4 rounded-md">
                    <span className="text-white font-medium">Storage</span>
                    <span className="text-sm text-white">{fileSize} of 6GB</span>
                    <Progress percentage={52.2} />
                </div>

                <div>
                    {/*<Image src={USER_ICON} width={40} height={40} alt="user-icon" className="rounded-full" />*/}
                    <span className="font-medium text-gray-700">{fullName}</span>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar