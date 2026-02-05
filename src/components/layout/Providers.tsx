"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { system } from "@/lib/theme"
import { SchedulerProvider } from "@/context/SchedulerContext"

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ChakraProvider value={system}>
            <SchedulerProvider>
                {children}
            </SchedulerProvider>
        </ChakraProvider>
    )
}
