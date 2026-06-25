"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import CustomInput from "./CustomInput"
import { Mail, UserRoundPenIcon } from "lucide-react"
import ButtonWithLoading from "./ButtonWithLoading"
import { isValidEmail } from "@/lib/utils"
import { createAccount } from "@/lib/appwrite/user.actions"

const Auth = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        registerEmail: "",
    });

    const [email, setEmail] = useState("");
    const [tabValue, setTabValue] = useState("signIn");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [accountId, setAccountId] = useState("");

    const handleTabValueChange = (value: string) => {
        setTabValue(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev, 
                [name]: value,
            };
        });
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleContinueClick = async () => {
        const { fullName, registerEmail } = formData || {};

        if (!fullName && tabValue === "signUp") {
            setErrorMessage("Full Name is required");
            return;
        }

        if (!isValidEmail(registerEmail) && !isValidEmail(email)) {
            setErrorMessage("Invalid Email");
            return;
        }

        try {
            setLoading(true);

            const user = await createAccount({ fullName, email: registerEmail });
            if (user.accountId) {
                setAccountId(user.accountId);
            }
            setErrorMessage(user.message);
            setLoading(false);
        } catch (error) {
            setErrorMessage("Sign In Failed. Please try again in sometime");
            console.log("Sign In failed", error);
        } finally {
            setLoading(false);
        }
    }

    console.log("print:", {accountId, errorMessage});

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
                            <CustomInput Icon={Mail} labelTitle="Email" labelHtmlFor="email" value={email} onChange={handleEmailChange} inputName="registerEmail" />
                        </div>
                    </TabsContent>

                    <TabsContent value="signUp">
                        <div className="flex flex-col gap-4 mt-6">
                            <CustomInput Icon={UserRoundPenIcon} labelTitle="Full Name" labelHtmlFor="fullName" value={formData.fullName} onChange={handleChange} inputName="fullName" />
                            <CustomInput Icon={Mail} labelTitle="Email" labelHtmlFor="email" value={formData.registerEmail} onChange={handleChange} inputName="registerEmail" />
                        </div>
                    </TabsContent>
                </Tabs>
                <ButtonWithLoading loading={loading} onClick={handleContinueClick} />
            </div>
        </div>
    );
}

export default Auth;
