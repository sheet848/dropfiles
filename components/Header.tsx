"use client"
import { signOutuser } from "@/lib/appwrite/user.actions";
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOutuser();
            router.push("/auth");
        } catch (error) {
            console.log("Logout failed:", error);
        }
    };

  return (
    <div className="flex items-center justify-between px-7 mt-6">
        {/* Search */}
        <div className="flex gap-4">
            {/* FileUploader */}
            <button className="cursor-pointer h-11 w-11 flex items-center justify-center gap-2"
                onClick={handleLogout}
            >
                <LogOut className="text-froly h-5 w-5 rotate-180" />
            </button>
        </div>
    </div>
  )
}

export default Header