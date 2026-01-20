import * as React from "react"

interface DialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    children: React.ReactNode
}

interface DialogContentProps {
    children: React.ReactNode
    className?: string
}

interface DialogHeaderProps {
    children: React.ReactNode
}

interface DialogTitleProps {
    children: React.ReactNode
}

interface DialogDescriptionProps {
    children: React.ReactNode
}

interface DialogFooterProps {
    children: React.ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/50"
                onClick={() => onOpenChange(false)}
            />
            <div className="relative z-50">{children}</div>
        </div>
    )
}

export function DialogContent({ children, className = "" }: DialogContentProps) {
    return (
        <div className={`bg-white rounded-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 max-w-md w-full mx-4 ${className}`}>
            {children}
        </div>
    )
}

export function DialogHeader({ children }: DialogHeaderProps) {
    return <div className="mb-4">{children}</div>
}

export function DialogTitle({ children }: DialogTitleProps) {
    return <h2 className="text-2xl font-bold">{children}</h2>
}

export function DialogDescription({ children }: DialogDescriptionProps) {
    return <p className="text-gray-600 mt-2">{children}</p>
}

export function DialogFooter({ children }: DialogFooterProps) {
    return <div className="flex gap-2 justify-end mt-6">{children}</div>
}
