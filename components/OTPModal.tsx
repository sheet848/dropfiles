import { useState } from "react";
import { Mail } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp"
import ButtonWithLoading from "./ButtonWithLoading";
import { verifySecret } from "@/lib/appwrite/user.actions";
import { useRouter } from "next/navigation";

const OTPModal = ({ accountId, email }: { accountId: string; email: string }) => {

    const [showOtpModal, setShowOtpModal] = useState(true);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleVerifyEmail = async () => {
        setLoading(true);

        try {
            const session = await verifySecret({ accountId, password });
            if (session) {
                router.push("/");
            }
            setLoading(false);
        } catch (error) {
            console.log("Failed to verify OTP", error);
            setLoading(false);
        }
    }

    return (
        <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
            <DialogContent className="max-w-max"> 
                <div className="flex flex-col items-center justify-center">
                    <div className="bg-froly/10 rounded-full w-16 h-16 flex items-center justify-center">
                        <Mail className="w-8 h-8 text-froly" />
                    </div>
                    <span className="text-2xl font-medium mt-6">Check your email</span>
                    <span className="text-center text-gray-600 font-light">Enter the verification code sent to {" "} <strong className="font-medium text-black">{email}</strong></span>

                    <InputOTP maxLength={6} value={password} onChange={setPassword}>
                        <InputOTPGroup className="mt-8 flex gap-2 rounded-none">
                            <InputOTPSlot index={0} className="border border-gray-600 rounded-md p-6 text-2xl" />
                            <InputOTPSlot index={1} className="border border-gray-600 rounded-md p-6 text-2xl" />
                            <InputOTPSlot index={2} className="border border-gray-600 rounded-md p-6 text-2xl" />
                            <InputOTPSlot index={3} className="border border-gray-600 rounded-md p-6 text-2xl" />
                            <InputOTPSlot index={4} className="border border-gray-600 rounded-md p-6 text-2xl" />
                            <InputOTPSlot index={5} className="border border-gray-600 rounded-md p-6 text-2xl" />
                        </InputOTPGroup>
                    </InputOTP>

                    <span className="mt-4 text-gray-600">Didn't get a code?
                        <strong className="text-black underline cursor-pointer font-normal">resend</strong>
                    </span>

                    <ButtonWithLoading loading={loading} onClick={handleVerifyEmail} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default OTPModal
