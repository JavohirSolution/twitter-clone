import Auth from "@/components/auth";
import Image from "next/image";

export default function Home() {
    const user = false;
    if (!user) {
        return (
            <div>
                <Auth />
            </div>
        )
    }
    return (
        <>
            <div>
                <h1 className="text-white text-2xl">Hello world</h1>
            </div>
        </>
    );
}
