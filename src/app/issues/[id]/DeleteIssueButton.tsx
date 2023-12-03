"use client"
import { Spinner } from '@/components/Spinner'
import { CrossCircledIcon } from '@radix-ui/react-icons'
import {
    Button,
    AlertDialog,
    Flex,
} from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


export default function DeleteIssueButton({ issueId }: { issueId: string }) {
    const router = useRouter()
    const [error, setError] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const deleteIssue = async () => {
        try {
            setDeleting(true)
            await axios.delete(`/api/issues/${issueId}`)
            router.push("/issues")
            router.refresh();
        } catch (error) {
            setDeleting(false)
            console.log(error)
            setError(true)
        }
    }
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button className='w-full bg-red-500'
                        disabled={deleting}
                    >
                        <CrossCircledIcon />
                        Delete Issue
                        {deleting && <Spinner />}
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content style={{ maxWidth: 500 }}>
                    <AlertDialog.Title>Delete Issue</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure you want to delete this Issue? This action is permanent and
                        cannot be undone.
                    </AlertDialog.Description>
                    <Flex mt="4" className='justify-end' gap="2">
                        <AlertDialog.Cancel>
                            <Button variant='surface' color='gray'>Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button variant='surface' color='red'
                                onClick={deleteIssue}
                            >Delete</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        An unexpected error occurred
                    </AlertDialog.Description>
                    <Flex mt="4" className='justify-end' gap="2">
                        <AlertDialog.Action>
                            <Button variant='surface' color='red'
                                onClick={() => setError(false)}
                            >Close</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>


    )
}