import { HERO_IMAGE } from "@/lib/constants";
import { Layers } from "lucide-react";
import Image from "next/image";
import { Metadata } from "react";

export const metadata: Metadata = {
    title: "Login",
    description: "Login to DropFiles",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen flex">
            <section className="bg-froly flex-1">
                <div className="flex items-start justify-center flex-center flex-col gap-4 max-w-125 m-auto h-full">
                    <div className="flex items-center justify-center gap-3">
                        <Layers className="w-10 h-10 text-white" />
                        <span className="text-white font-medium text-3xl">DropFiles</span>
                    </div>

                    <div className="flex items-start gap-4 flex-col mt-8">
                        <span className="font-bold text-[32px] text-white">A Better Way to Store, Organize, and Access Your Files</span>
                        <span className="text-white">Securely upload, manage, and access your files from any device, anytime.</span>

                        <Image src={HERO_IMAGE} width={100} height={100} alt="hero-image" className="mt-15" />
                    </div>
                </div>
            </section>

            <section className="bg-white flex-1">
                {children}
            </section>
        </div>
    )
}

export default Layout;