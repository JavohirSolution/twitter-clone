"use client";

import useRegisterModal from "@/hooks/useRegisterModal"
import Modal from "../ui/modal";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerStep1Schema, registerStep2Schema } from "@/lib/validation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import Button from "../ui/button";
import useLoginModal from "@/hooks/useLoginModal";


export default function RegisterModal() {

  const [step, setStep] = useState<number>(1)
  const [data, setData] = useState({ name: "", email: "" });

  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);



  const bodyContent = step === 1 ? <RegisterStep1 setData={setData} setStep={setStep} /> : <RegisterStep2 />;

  const footer = (
    <div className="text-slate-500 mt-7 pb-10">Already have an account? <span className="text-sky-500 text-xl cursor-pointer hover:underline font-bold" onClick={onToggle}>Sign in</span></div>
  )

  return <Modal
    body={bodyContent}
    footer={footer}
    isOpen={registerModal.isOpen}
    onClose={registerModal.onClose}
    step={step}
    totalSteps={2}
  />
}

function RegisterStep1({
  setData,
  setStep
}: {
  setData: Dispatch<SetStateAction<{ name: string, email: string }>>;
  setStep: Dispatch<SetStateAction<number>>
}) {
  const form = useForm<z.infer<typeof registerStep1Schema>>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerStep1Schema>) {
    setData(values)
    setStep(2)
  }

  const { isSubmitting } = form.formState
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
        <h3 className="text-3xl font-semibold text-white">Create an account</h3>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button label={"Next"} fullwidth secondary large disabled={isSubmitting} />
      </form>
    </Form>
  )
}

function RegisterStep2() {
  const form = useForm<z.infer<typeof registerStep2Schema>>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerStep2Schema>) {

  }
  const { isSubmitting } = form.formState

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-12">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button label={"Register"} fullwidth secondary large disabled={isSubmitting} />
      </form>
    </Form>
  )
}