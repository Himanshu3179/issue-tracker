import { IssueStatusBadge } from '@/components/IssueStatusBadge';
import prisma from '../../../prisma/client'
import { Table } from '@radix-ui/themes'
import Link from '@/components/Link';
import React from 'react'
import IssueActions from './IssueActions';

export default async function Issues() {

    const issues = await prisma.issue.findMany();
    console.log(issues)
    return (
        <div>
            <IssueActions />
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.RowHeaderCell>
                                <Link href={`/issues/${issue.id}`}>
                                    {issue.title}
                                </Link>
                                <div className='block md:hidden'>
                                    <IssueStatusBadge status={issue.status} />
                                </div>
                            </Table.RowHeaderCell>
                            <Table.Cell className='hidden md:table-cell'>
                                <IssueStatusBadge status={issue.status} />
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toLocaleString()}</Table.Cell>
                        </Table.Row>
                    ))
                    }
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export const dynamic = 'force-dynamic';
