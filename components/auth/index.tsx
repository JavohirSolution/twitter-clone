"use client";

import React, { useCallback } from 'react';
import LoginModal from '../modals/login-modal';
import RegisterModal from '../modals/register-modal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import Image from 'next/image';
import Button from '../ui/button';

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

const Auth = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const onOpenRegisterModal = useCallback(() => {
        registerModal.onOpen()
    }, [registerModal]);

    const onOpenLoginModal = useCallback(() => {
        loginModal.onOpen()
    }, [loginModal]);

    return (
        <div className='h-[100vh] box-border'>
            <RegisterModal />
            <LoginModal />
            <div className='grid grid-cols-1 md:grid-cols-2 h-[100vh] items-center'>
                <Image
                    src={"/images/twitter-x.png"}
                    alt='Twitter X Images'
                    width={450}
                    height={450}
                    className='justify-self-center hidden md:block'
                />
                <div className='text-white flex flex-col gap-6 justify-center h-full md:m-0 ml-9 mr-4'>
                    <div className='block md:hidden'>
                        <Image src={"/images/twitter-x.png"}
                            alt='Twitter X Images'
                            width={60}
                            height={60}
                        />
                    </div>
                    <h1 className='md:text-7xl text-5xl font-bold'>Happening now</h1>
                    <div className='w-full flex flex-col md:w-[60%]'>
                        <h2 className='font-bold text-3xl mb-4'>Join today.</h2>
                        <div className='flex flex-col space-y-2 w-[500px] md:w-96 mt-6'>
                            <Button
                                label={
                                    <div className="flex gap-2 items-center justify-center">
                                        <FcGoogle className='text-2xl' />
                                        Sign up with Google
                                    </div>
                                }
                                secondary
                                fullwidth
                            />
                            <Button
                                label={
                                    <div className="flex gap-2 items-center justify-center">
                                        <AiFillGithub className='text-2xl' />
                                        Sign up with Github
                                    </div>
                                }
                                fullwidth
                                secondary
                            />
                            <div className="flex items-center md:justify-center">
                                <div className="h-px bg-gray-700 md:w-1/2 w-1/3" />
                                <p className="mx-4">or</p>
                                <div className="h-px bg-gray-700 md:w-1/2 w-1/3" />
                            </div>
                            <Button
                                label="Create an account"
                                fullwidth
                                onClick={onOpenRegisterModal}
                            />
                            <p className='text-xs text-slate-500 w-96'>By signing up, you agree to the <span className='text-sky-500'>Terms of Service</span> and <span className='text-sky-500'>Privacy Policy</span>, including <span className='text-sky-500'>Cookie Use.</span></p>
                            <div className='flex flex-col gap-4'>
                                <h1 className='mt-8'>Already have an account?</h1>
                                <Button
                                    onClick={onOpenLoginModal}
                                    label={
                                        "Sign in"
                                    }
                                    outline
                                    border
                                    fullwidth
                                />
                            </div>


                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Auth