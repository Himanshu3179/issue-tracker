import { IssueStatusBadge } from '@/components/IssueStatusBadge'
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export default function Loading() {
    return (
        <Box className='max-w-xl'>
            <Skeleton />
            <Flex gap="2" my="3">
                <Skeleton width="5rem" />
                <Skeleton width="8rem" />
            </Flex>
            <Card className='prose'>
                <Skeleton count={3} />
            </Card>
        </Box>
    )
}
