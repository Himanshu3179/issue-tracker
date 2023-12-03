import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import prisma from '../../../../prisma/client'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
interface Props { params: { id: string } }

const IssueDetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: params.id },
    })
    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="2">
            <Box>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <EditIssueButton issueId={issue.id} />
            </Box>
        </Grid>

    )
}

export default IssueDetailPage;