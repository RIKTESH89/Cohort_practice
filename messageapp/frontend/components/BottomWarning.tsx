
export function BottomWarning({ Warning: Warning}: { Warning: string }) {

    return (
        <div className="flex justify-center text-lg mb-6">
            <div className="mx-2">{Warning}</div>
            <div>Signup</div>
        </div>
    )
}