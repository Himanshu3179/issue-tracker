import { Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default async function Loading() {

    return (
        <Box className='max-w-xl'>
            <Skeleton />
            <Skeleton height="20rem" />
        </Box>
    )
}