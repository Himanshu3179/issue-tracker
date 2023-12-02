"use client"
import { Button, TextArea, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form"
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';


interface FormData {
    title: string;
    description: string;
}
export default function NewIssue() {
    const { register, control, handleSubmit } = useForm<FormData>();
    const router = useRouter()
    return (
        <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
            await axios.post('/api/issues', data);
            router.push("/issues")
        })}>
            <TextField.Root>
                <TextField.Input placeholder="Title"  {...register("title")} />
            </TextField.Root>
            <Controller
                name='description'
                control={control}
                render={({ field }) => (
                    <SimpleMDE placeholder='description' {...field} />
                )}
            />
            <Button>Submit New Issue</Button>
        </form>
    )
}
