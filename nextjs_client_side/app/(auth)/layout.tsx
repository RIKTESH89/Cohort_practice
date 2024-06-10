export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div>
        <div className="border-b p-1 text-center bg-gray-400">Sign in to get 50% off</div>
    {children}
    </div>;
}