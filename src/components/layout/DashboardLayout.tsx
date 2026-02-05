"use client"

import { Flex, Box } from "@chakra-ui/react"
import { Sidebar } from "./Sidebar"
import { TopHeader } from "./TopHeader"

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Flex h="100vh" bg="white" overflow="hidden">
            <Sidebar />

            <Flex direction="column" flex="1" overflow="hidden">
                <TopHeader />

                <Box flex="1" overflow="auto" p={0}>
                    {children}
                </Box>
            </Flex>
        </Flex>
    )
}
