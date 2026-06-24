"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import CustomInput from "./CustomInput"
import { Mail, UserRoundPen, UserRoundPenIcon } from "lucide-react"

const Auth = () => {
    const [tabValue, setTabValue] = useState()

    const handleTabValueChange = () => {

    };

    const handleChange = () => {};

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center">
                <span className="font-bold text-3xl">Welcome Back</span>
                <span className="text-gray-500 mt-1">Welcome Back, Please Enter Your Details</span>

                <Tabs defaultValue={tabValue} onValueChange={handleTabValueChange} className="mt-6">
                    <TabsList className="w-100 min-h-12.5">
                        <TabsTrigger value="signIn" className="font-medium cursor-pointer">Login</TabsTrigger>
                        <TabsTrigger value="signUp" className="font-medium cursor-pointer">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signIn">
                        <div className="flex flex-col gap-4 mt-6">
                            <CustomInput Icon={Mail} labelTitle="Email" labelHtmlFor="email" value="" onChange={handleChange} inputName="registerEmail" />
                        </div>
                    </TabsContent>

                    <TabsContent value="signUp">
                        <div className="flex flex-col gap-4 mt-6">
                            <CustomInput Icon={UserRoundPenIcon} labelTitle="Full Name" labelHtmlFor="fullName" value="" onChange={handleChange} inputName="fullname" />
                            <CustomInput Icon={Mail} labelTitle="Email" labelHtmlFor="email" value="" onChange={handleChange} inputName="registerEmail" />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default Auth;
