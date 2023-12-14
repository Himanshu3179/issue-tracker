"use client"
import { issueSchema } from '@/app/validationSchema';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Spinner } from '@/components/Spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { z } from 'zod';


import SimpleMDE from 'react-simplemde-editor';

type FormData = z.infer<typeof issueSchema>

export default function IssueForm({ issue }: { issue?: Issue }) {
    const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(issueSchema)
    });
    const router = useRouter()
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            if (issue) {
                console.log("updating issue")
                await axios.patch(`/api/issues/${issue.id}`, data);
            }
            else {
                await axios.post('/api/issues', data);
            }
            router.push("/issues")
            router.refresh();

        } catch (e) {
            setSubmitting(false);
            if (e instanceof Error) {
                console.log(e.message)
                setError(e.message);
            }
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
                    <TextField.Input defaultValue={issue?.title} placeholder="Title"  {...register("title")} />
                </TextField.Root>
                <ErrorMessage >{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => (
                        <SimpleMDE placeholder='description' {...field} />
                    )}
                />
                <ErrorMessage >{errors.description?.message}</ErrorMessage>
                <Button disabled={submitting}>
                    {issue ? 'Update Issue' : 'Submit New Issue'}
                    {' '}
                    {submitting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}
