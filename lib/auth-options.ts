import User from "@/database/user.model";
import { AuthOptions } from "next-auth";
import { connectToDatabase } from "./mongoose";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOption: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectToDatabase();

                const user = await User.findOne({
                    email: credentials?.email,
                });

                return user;
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async session({ session }: any) {
            await connectToDatabase();
            const user = await User.findOne({ email: session.user?.email });
            if (!user) {
                const newUser = await User.create({
                    email: session.user?.email,
                    name: session.user?.name,
                    profileImage: session.user?.image
                })
                session.currentUser = newUser;
            }
            session.currentUser = user
            return session
        }
    },
    session: { strategy: "jwt" },
    jwt: { secret: process.env.NEXTAUTH_JWT_SECRET },
    secret: process.env.NEXTAUTH_SECRET
}