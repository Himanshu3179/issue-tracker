import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import prisma from '../../../../prisma/client'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOption from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'
interface Props { params: { id: string } }

const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOption);
    const issue = await prisma.issue.findUnique({
        where: { id: params.id },
    })
    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap="2">
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            {
                session && (
                    <Box>
                        <Flex direction="column" gap="2">
                            <AssigneeSelect issue={issue} />
                            <EditIssueButton issueId={issue.id} />
                            <DeleteIssueButton issueId={issue.id} />
                        </Flex>
                    </Box>
                )
            }
        </Grid>

    )
}

export default IssueDetailPage;