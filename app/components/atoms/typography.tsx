import type { ReactNode } from "react";

import { cn } from "~/lib/utils";

interface TypographyProps {
    children?: ReactNode;
    className?: string;
}

export function TypographyH1({ children, className }: TypographyProps) {
    return (
        <h1
            className={cn(
                "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
                className
            )}
        >
            {children || "Taxing Laughter: The Joke Tax Chronicles"}
        </h1>
    );
}

export function TypographyH2({ children, className }: TypographyProps) {
    return (
        <h2
            className={cn(
                "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
                className
            )}
        >
            {children || "The People of the Kingdom"}
        </h2>
    );
}

export function TypographyH3({ children, className }: TypographyProps) {
    return (
        <h3
            className={cn(
                "scroll-m-20 text-2xl font-semibold tracking-tight",
                className
            )}
        >
            {children || "The Joke Tax"}
        </h3>
    );
}

export function TypographyH4({ children, className }: TypographyProps) {
    return (
        <h4
            className={cn(
                "scroll-m-20 text-xl font-semibold tracking-tight",
                className
            )}
        >
            {children || "People stopped telling jokes"}
        </h4>
    );
}

export function TypographyH5({ children, className }: TypographyProps) {
    return (
        <h5
            className={cn(
                "scroll-m-20 text-lg font-semibold tracking-tight",
                className
            )}
        >
            {children || "The kingdom prospered"}
        </h5>
    );
}

export function TypographyH6({ children, className }: TypographyProps) {
    return (
        <h6
            className={cn(
                "scroll-m-20 text-base font-semibold tracking-tight",
                className
            )}
        >
            {children || "And they lived happily ever after"}
        </h6>
    );
}

export function TypographyBlockquote({ children, className }: TypographyProps) {
    return (
        <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
            {children || (
                <>
                    &quot;After all,&quot; he said, &quot;everyone enjoys a good
                    joke, so it&apos;s only fair that they should pay for the
                    privilege.&quot;
                </>
            )}
        </blockquote>
    );
}

export function TypographyTable({ className }: { className?: string }) {
    return (
        <div className={cn("my-6 w-full overflow-y-auto", className)}>
            <table className="w-full">
                <thead>
                    <tr className="even:bg-muted m-0 border-t p-0">
                        <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                            King's Treasury
                        </th>
                        <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                            People's happiness
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="even:bg-muted m-0 border-t p-0">
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                            Empty
                        </td>
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                            Overflowing
                        </td>
                    </tr>
                    <tr className="even:bg-muted m-0 border-t p-0">
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                            Modest
                        </td>
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                            Satisfied
                        </td>
                    </tr>
                    <tr className="even:bg-muted m-0 border-t p-0">
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                            Full
                        </td>
                        <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                            Ecstatic
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export function TypographyList({ children, className }: TypographyProps) {
    return (
        <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
            {children || (
                <>
                    <li>1st level of puns: 5 gold coins</li>
                    <li>2nd level of jokes: 10 gold coins</li>
                    <li>3rd level of one-liners : 20 gold coins</li>
                </>
            )}
        </ul>
    );
}

export function TypographyInlineCode({ children, className }: TypographyProps) {
    return (
        <code
            className={cn(
                "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
                className
            )}
        >
            {children || "@radix-ui/react-alert-dialog"}
        </code>
    );
}

export function TypographyLead({ children, className }: TypographyProps) {
    return (
        <p className={cn("text-muted-foreground text-xl", className)}>
            {children ||
                "A modal dialog that interrupts the user with important content and expects a response."}
        </p>
    );
}

export function TypographyLarge({ children, className }: TypographyProps) {
    return (
        <div className={cn("text-lg font-semibold", className)}>
            {children || "Are you absolutely sure?"}
        </div>
    );
}

export function TypographySmall({ children, className }: TypographyProps) {
    return (
        <small className={cn("text-sm leading-none font-medium", className)}>
            {children || "Email address"}
        </small>
    );
}

export function TypographyMuted({ children, className }: TypographyProps) {
    return (
        <p className={cn("text-muted-foreground text-sm", className)}>
            {children || "Enter your email address."}
        </p>
    );
}

export function TypographyP({ children, className }: TypographyProps) {
    return (
        <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
            {children ||
                "The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax."}
        </p>
    );
}
