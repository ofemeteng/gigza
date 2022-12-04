import { HTMLInputTypeAttribute } from "react";

export type InputProps = {
    id: string;
    type: HTMLInputTypeAttribute;
    label: string;
    placeholder: string;
    name: string;
    labelClassName?: string;
    className?: string;
    value: string;
    handleTextChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    [x: string]: any;
}