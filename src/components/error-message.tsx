interface ErrorMessageProps {
    error: string | undefined
}

export function ErrorMessage({error}: ErrorMessageProps) {
    return <span className="text-red-600 font-semibold text-sm">{error}</span>
}