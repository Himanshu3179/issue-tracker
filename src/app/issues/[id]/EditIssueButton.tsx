import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

export default function EditIssueButton({ issueId }: { issueId: string }) {
    return (
        <Link href={`/issues/${issueId}/edit`}>
            <Button>
                <Pencil2Icon />
                Edit Issue
            </Button>
        </Link>
    )
}
