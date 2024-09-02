import ProfileBio from '@/components/profile/profile-bio';
import ProfileHero from '@/components/profile/profile-hero';
import Header from '@/components/shared/header'
import PostFeed from '@/components/shared/post-feed';
import { getUserById } from '@/lib/actions/user.action'
import { authOption } from '@/lib/auth-options';
import { IUser } from '@/types';
import { getServerSession } from 'next-auth';

const Profile = async ({ params }: { params: { userId: string } }) => {
    const session: any = await getServerSession(authOption);
    const user = await getUserById(params.userId);
    return (
        <>
            <Header label={user.name} isBack />
            <ProfileHero
                user={JSON.parse(JSON.stringify(user))}
            />
            <ProfileBio
                user={JSON.parse(JSON.stringify(user))}
                userId={JSON.parse(JSON.stringify(session)).currentUser._id}
            />
            <PostFeed
                userId={params.userId}
                user={JSON.parse(JSON.stringify(session.currentUser))}
            />
        </>
    )
}

export default Profile