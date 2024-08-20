import Auth from "@/components/auth";
import { Provider } from "@/components/provider/theme-provider";
import { authOption } from "@/lib/auth-options";
import { getServerSession } from "next-auth/next";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOption);
    if (!session) {
        return (
            <div className="container h-screen mx-auto max-w-7xl">
                <Auth />
            </div>
        )
    }
    return (
        <html lang="en">
            <body>
                <Provider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </Provider>
            </body>
        </html>
    );
}
