"use client"
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form"
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchema';
import { z } from 'zod';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Spinner } from '@/components/Spinner';


type FormData = z.infer<typeof createIssueSchema>

export default function NewIssue() {
    const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(createIssueSchema)
    });
    const router = useRouter()
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            await axios.post('/api/issues', data);
            router.push("/issues")
        } catch (error) {
            setSubmitting(false)
            console.log(error)
            setError('An unexpected error occurred')
        }
    })

    return (
        <div className='max-w-xl'>
            {
                error && (<Callout.Root color='red' className='mb-4'>
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>)
            }
            <form className=' space-y-3' onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input placeholder="Title"  {...register("title")} />
                </TextField.Root>
                <ErrorMessage >{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE placeholder='description' {...field} />
                    )}
                />
                <ErrorMessage >{errors.description?.message}</ErrorMessage>
                <Button disabled={submitting}>
                    Submit New Issue
                    {submitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}
