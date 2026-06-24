import { CustomInputProps } from "@/lib/types"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"

const CustomInput = ({ Icon, labelTitle, labelHtmlFor, value, onChange, inputName, classNames }: CustomInputProps) => {
    return (
        <div className={cn("flex items-center justify-start border rounded-xl px-8 py-2 gap-2", classNames)}>
            <Icon />
            <div className="w-8 h-[0.5px] bg-gray-400 rotate-90"></div>
            <div className="flex flex-col mt-1.5 w-full">
                <label htmlFor={labelHtmlFor} className="text-sm font-medium text-gray-600">{labelTitle}</label>
            </div>
            <Input name={inputName} type="text" autoComplete="off" value={value} onChange={onChange}
                className="border-0 focus-visible:ring-0 mt-2 font-medium shadow-none p-0"
            />
        </div>
    )
}

export default CustomInput