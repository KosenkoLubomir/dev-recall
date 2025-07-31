import React, { ReactNode } from "react";
import Link from "next/link";

type BtnProps = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    children?: string | ReactNode;
    href?: string;
    target?: string;
    id?: string;
    size?: "lg" | "md" | "sm" | "xs";
    disabled?: boolean;
    type?: "button" | "submit" | "reset" | "link";
    view?: "primary" | "danger" | "success" | "secondary" | undefined;
};

export default function Button({
                                          onClick,
                                          id,
                                          className,
                                          children,
                                          href,
                                          type = "button",
                                          view = "primary",
                                          target = "_self",
                                          size = "md",
                                          disabled,
                                      }: BtnProps) {

    const classes = `inline-flex cursor-pointer border-1 relative items-center whitespace-nowrap shrink-0 transition-bg transition-border transition-color duration-200 ease-in-out rounded-md     
    ${ !disabled && view === "primary" ? "bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 active:bg-blue-700 active:border-blue-700" : "" } 
    ${!disabled && view === "success" ? "bg-green-500 border-green-500 text-white hover:bg-green-600 hover:border-green-600 active:bg-green-700 active:border-green-700" : "" }
    ${ !disabled && view === "secondary" ? "text-gray-600 bg-gray-200 border-gray-200 hover:bg-gray-300 hover:border-gray-300 active:bg-gray-400 active:border-gray-400" : "" }
    ${ !disabled && view === "danger" ? "bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600 active:bg-red-700 active:border-red-700" : "" }
    ${size === "lg" ? "py-3 px-6 text-lg font-semibold" : ""}
    ${size === "md" ? "py-2 px-4 text-md font-semibold" : ""}
    ${size === "sm" ? "py-1.5 px-3 text-sm" : ""}
    ${size === "xs" ? "py-1 px-2 text-xs" : ""}
    ${disabled ? "cursor-default opacity-80 bg-zinc-400 text-zinc-600 border-zinc-400" : "" }
    ${className}
  `;

    let el;

    if (type === "link") {
        el = (
            <Link id={id} href={href as string} target={target} className={classes}>
                {children}
            </Link>
        );
    } else {
        el = (
            <button
                id={id}
                type={type}
                onClick={(event) => onClick?.(event)}
                disabled={disabled}
                className={classes}
            >
                {children}
            </button>
        );
    }
    return el;
}
