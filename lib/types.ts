export type CustomInputProps = {
    Icon: React.ComponentType;
    labelTitle: string;
    labelHtmlFor: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputName: string;
    classNames?: string;
};
