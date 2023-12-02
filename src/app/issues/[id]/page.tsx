import { notFound } from 'next/navigation'
import prisma from '../../../../prisma/client'
import React from 'react'
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes'
import { IssueStatusBadge } from '@/components/IssueStatusBadge'
import ReactMarkdown from 'react-markdown'
interface Props { params: { id: string } }

const IssueDetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: params.id },
    })
    if (!issue) notFound();

    return (
        <Box className='max-w-xl'>
            <Heading>{issue.title}</Heading>
            <Flex gap="2" my="3">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toLocaleString()}</Text>
            </Flex>
            <Card className='prose'>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </Box>
    )
}

export default IssueDetailPage;