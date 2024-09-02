import Auth from "@/components/auth";
import { authOption } from "@/lib/auth-options";
import { getServerSession } from "next-auth/next";
import { Toaster } from "@/components/ui/toaster"
import NextTopLoader from 'nextjs-toploader';
import Sidebar from "@/components/sidebar/sidebar";
import FollowBar from "@/components/shared/follow-bar";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session: any = await getServerSession(authOption);
    if (!session) {
        return (
            <div className="container h-screen mx-auto max-w-7xl">
                <Auth />
            </div>
        )
    }
    return (
        <div className="lg:container h-screen mx-auto lg:max-w-7xl text-white ">
            <div className="flex">
                <Sidebar user={JSON.parse(JSON.stringify(session?.currentUser))} />
                <div className="flex flex-1 border-x-[1px] border-neutral-800 lg:mx-4 ml-1">
                    <div className="w-full">
                        <NextTopLoader
                            color="#2299DD"
                            initialPosition={0.08}
                            crawlSpeed={200}
                            height={3}
                            crawl={true}
                            showSpinner={false}
                            easing="ease"
                            speed={200}
                            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                        />
                        {children}
                        <Toaster />
                    </div>
                </div>
                <FollowBar />
            </div>
        </div>
    );
}
