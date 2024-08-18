import useLoginModal from '@/hooks/useLoginModal'
import React, { useCallback } from 'react'
import Modal from '../ui/modal'
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import Button from "../ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '@/lib/validation';
import useRegisterModal from '@/hooks/useRegisterModal';

const LoginModal = () => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const onToggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [registerModal, loginModal])

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log(values)
    }
    const { isSubmitting } = form.formState

    const footer = (
        <div className="text-slate-500 mt-7 pb-10">Don't have an account? <span className="text-sky-500 text-xl cursor-pointer hover:underline font-bold" onClick={onToggle}>Sign up</span></div>
    )

    const bodyContent = (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button label={"Login"} fullwidth secondary large disabled={isSubmitting} />
            </form>
        </Form>
    )


    return <Modal isOpen={loginModal.isOpen} onClose={loginModal.onClose} body={bodyContent} footer={footer} />
}

export default LoginModal


